import { Component, Input, ViewContainerRef } from '@angular/core';
import { ComponentBase } from '../componentBase';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ced-form-wizard-step',
  templateUrl: 'formWizardStep.component.html',
  styleUrls: ['formWizardStep.component.scss'],
  host: {
    '[class.active]': 'activeCheck()'
  }
})
export class FormWizardStepComponent extends ComponentBase {

  @Input('title') stepTitle: string;
  @Input('active') isStepActive: boolean;

  get isNextEnabled(): Observable<boolean> {
    return this.isNextEnabledSubject.asObservable();
  }

  private isNextEnabledSubject: BehaviorSubject<boolean>;
  private onNextCallback: Function;
  private onFinishCallback: Function;
  private canGoNext: Observable<boolean>;

  public activeCheck() {
    return this.isStepActive;
  }

  constructor() {
    super();
    this.isNextEnabledSubject = new BehaviorSubject<boolean>(false);
  }

  ngAfterContentInit() {
  }

  public registerCanGoNext(obs: Observable<boolean>): void {
    if(obs) {
      this.canGoNext = obs;
      this.disposeOnDestroy(this.canGoNext.subscribe(value => this.isNextEnabledSubject.next(value)));
    }
  }

  public registerOnNext(i_function: Function): void {
    this.onNextCallback = i_function;
  }

  public registerOnFinish(i_function: Function): void {
    this.onFinishCallback = i_function;
  }

  public onNext(): void {
    if (this.onNextCallback) {
      this.onNextCallback();
    }
  }

  public onFinish(): void {
    if(this.onFinishCallback) {
      this.onFinishCallback();
    }
  }


}
