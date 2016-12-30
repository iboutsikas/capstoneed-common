import { Directive, Input, EmbeddedViewRef, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Directive({
  selector: '[rxContext][rxContextOn]'
})
export class RxContext implements OnInit, OnDestroy{
  @Input() rxContextOn: Observable<any>;
  _viewRef: EmbeddedViewRef<any>;
  private contextSub: Subscription;

  constructor(private templateRef:TemplateRef<any>, private vcr: ViewContainerRef) {

  }

  ngOnInit() {
    this.contextSub = this.rxContextOn.subscribe(state => {
      if(!this._viewRef) {
        this._viewRef = this.vcr.createEmbeddedView(this.templateRef, { '$implicit': state });
      } else {
        this._viewRef.context.$implicit = state;
      }

    });
  }

  ngOnDestroy() {
    this.contextSub.unsubscribe();
  }

}
