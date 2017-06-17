import {
  Component, QueryList, ContentChildren, AfterContentInit, ViewChild, ElementRef, Input, DoCheck
} from '@angular/core';
import { FormWizardStepComponent } from '../formWizardStep - component/formWizardStep.component';
import { ComponentBase } from '../componentBase';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ced-form-wizard',
  templateUrl: 'formWizard.component.html',
  styleUrls: ['formWizard.component.scss']
})
export class FormWizardComponent extends ComponentBase implements AfterContentInit, DoCheck {
  private currentStep: number = 0;
  private nextSub: Subscription;
  private finishSub: Subscription;
  private isNextDisabled: boolean;
  private isNextHidden: boolean;
  private isFinishDisabled: boolean;
  private isFinishHidden: boolean;
  private finishedCallback: Function;
  private currentStepCmp: FormWizardStepComponent;

  @ContentChildren(FormWizardStepComponent) steps: QueryList<FormWizardStepComponent>;
  @ViewChild('nextButton') nextButton: ElementRef;
  @ViewChild('finishButton') finishButton: ElementRef;

  @Input("onFinish") set finishInput(i_function: Function) {
    if(i_function) {
      this.finishedCallback = i_function;
    }
  }

  constructor() {
    super();
    this.isNextDisabled = true;
    this.isFinishDisabled = true;


  }

  ngAfterContentInit() {
    let first = this.steps.toArray()[0];
    first.isStepActive = true;
    this.isNextHidden = !(this.currentStep < this.steps.length - 1);
    this.isFinishHidden = !(this.currentStep == this.steps.length - 1);
    this.subscribeNextAndFinish(first);
    this.steps.changes.subscribe(value => {
      this.currentStepCmp = this.steps.toArray()[this.currentStep];
      this.subscribeNextAndFinish(this.currentStepCmp);
    });
  }

  ngDoCheck() {
    this.isNextHidden = this.steps? !(this.currentStep < this.steps.length - 1) : false;
    this.isFinishHidden = this.steps? !(this.currentStep == this.steps.length - 1) : true;
    if (this.steps) {
      let stepsArray = this.steps.toArray();
      let current = stepsArray[this.currentStep];
      current.isStepActive = true;
    }

  }

  private onPrevious() {
    let stepsArray = this.steps.toArray();
    let current: FormWizardStepComponent = stepsArray[this.currentStep];
    this.currentStep--;

    if (this.currentStep < 0)
      this.currentStep = 0;
    let next: FormWizardStepComponent = stepsArray[this.currentStep];

    this.subscribeNextAndFinish(next);
    current.isStepActive = false;
    next.isStepActive = true;

  }

  private onNext() {
    if (this.currentStep >= this.steps.length){
      this.isNextDisabled = true;
      this.isFinishDisabled = true;
      return;
    }
    let stepsArray = this.steps.toArray();
    let current: FormWizardStepComponent = stepsArray[this.currentStep];
    this.currentStep++;

    if(this.currentStep >= stepsArray.length) {
      this.currentStep = stepsArray.length - 1;
    }
    let next: FormWizardStepComponent = stepsArray[this.currentStep];


    if(current) {
      current.onNext();
      current.isStepActive = false;
    }

    if(next) {
      this.subscribeNextAndFinish(next);
      next.isStepActive = true;
    }

  }

  private onFinish() {
    if(this.nextSub) this.nextSub.unsubscribe();
    if(this.finishSub) this.finishSub.unsubscribe();

    let last = this.steps.last;
    last.onFinish();
    last.isStepActive = false;
    if(this.finishedCallback) {
      this.finishedCallback();
    }
  }

  public subscribeNextAndFinish(step: FormWizardStepComponent) {
    if(!step) {
      console.log('step is null');
      return;
    }
    console.log('Wizard subscribing to: ', step);
    if (this.nextSub) {
      console.log('Wizard next unsub');
      this.nextSub.unsubscribe();
    }

    console.log(step.isNextEnabled);

    this.nextSub = step.isNextEnabled
      .do(value => console.log('Wizard received: ', value))
      .subscribe(value => { this.isNextDisabled = !value});

    // this.nextSub = step.isNextEnabled
    //   .do(value => console.log('Wizard received', value))
    //   .subscribe(
    //     (value) => { this.isNextDisabled = !value; },
    //     (err) => {},
    //     () => { console.log('Wizard is done'); }
    //   );

    if (this.finishSub) {
      this.finishSub.unsubscribe();
    }

    this.finishSub = step.isNextEnabledSubject.subscribe(value => {
        this.isFinishDisabled = !value;
      });
  }

  private visitStep(desiredStep: number) {
    if(desiredStep >= this.currentStep || desiredStep < 0)
      return;

    let stepsArray = this.steps.toArray();

    let current = stepsArray[this.currentStep];
    let next = stepsArray[desiredStep];

    if(current && next) {
      current.isStepActive = false;
    }

    if(next) {
      this.subscribeNextAndFinish(next);
      next.isStepActive = true;
      this.currentStep = desiredStep;
    }

  }

  public debug(): void {
    // console.log('Finish sub: ', this.finishSub);
    // console.log('Next sub: ', this.nextSub);
    // console.log(this.currentStepCmp);
    // console.log(this.steps.toArray()[0])
    console.log(this.currentStepCmp);
  }

}
