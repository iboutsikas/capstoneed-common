import { Component, Input, ViewContainerRef, DoCheck } from '@angular/core';
import { ComponentBase } from '../componentBase';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'ced-form-wizard-step',
  templateUrl: 'formWizardStep.component.html',
  styleUrls: ['formWizardStep.component.scss'],
  host: {
    '[class.active]': 'classActive'
  }
})
export class FormWizardStepComponent extends ComponentBase implements DoCheck {

  @Input('title') stepTitle: string;
  @Input('active') isStepActive: boolean = false;
  @Input('onNext') set onNextInput(value: Function) {
    if(value) {
      this.onNextCallbacks.push(value);
    }
  }
  @Input('onFinish') set onFinishInput(value: Function) {
    if(value) {
      this.onFinishCallbacks.push(value);
    }
  }
  @Input('canGoNext') set canGoNextInput(value: Observable<Boolean>) {
    if(value) {
      this.registerCanGoNext(value);
    }
  }

  private classActive: boolean = false;


  public get isNextEnabled(): Observable<boolean> {
    return this.isNextEnabledSubject.asObservable();
  }

  private isNextEnabledSubject: BehaviorSubject<boolean>;
  private onNextCallbacks: Function[];
  private onFinishCallbacks: Function[];
  private canGoNextSub: Subscription;
  // private id: number;

  constructor() {
    super();
    this.isNextEnabledSubject = new BehaviorSubject<boolean>(false);
    this.onNextCallbacks = [];
    this.onFinishCallbacks = [];
  }

  ngAfterContentInit() {
    this.classActive = this.isStepActive;

  }

  public ngDoCheck() {
    this.classActive = this.isStepActive;
  }

  public registerCanGoNext(obs: Observable<boolean>): void {
    if(obs) {
      if(this.canGoNextSub) {
        this.canGoNextSub.unsubscribe();
      }
      this.canGoNextSub = obs
        .subscribe(value => this.isNextEnabledSubject.next(value));
    }
  }

  public registerOnNext(i_function: Function): void {
    if(i_function) {
      this.onNextCallbacks.push(i_function);
    }
  }

  public registerOnFinish(i_function: Function): void {
    if(i_function) {
      this.onFinishCallbacks.push(i_function);
    }
  }

  public onNext(): void {
    this.onNextCallbacks.forEach(callback => {
      callback();
    });
  }

  public onFinish(): void {
    this.onFinishCallbacks.forEach(callback => callback());
  }


}
