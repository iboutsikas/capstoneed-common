///<reference path="../../../../node_modules/@angular/core/src/animation/metadata.d.ts"/>
import { EntityCreatedToast } from './entity-created-toast.base';
import { ProjectService } from '../../Services/project.service';
import { Project } from '../../Store/Models/project';
import { Component, trigger, state, style, transition, animate } from '@angular/core';

@Component({
  selector: '[toast-component]',
  template: `
  <button *ngIf="options.closeButton" (click)="remove()" class="toast-close-button">
    &times;
  </button>
  <div *ngIf="title" class="{{options.titleClass}}" [attr.aria-label]="title">
    {{title}}
  </div>
  <div *ngIf="message && options.enableHtml" class="{{options.messageClass}}" [innerHTML]="message">
  </div>
  <div *ngIf="message && !options.enableHtml" class="{{options.messageClass}}" [attr.aria-label]="message">
    {{message}}
  </div>
  <a [routerLink]="['/projects', _entity.id]" class="btn btn-sm">Show me!</a>
  <a [routerLink]="['/projects', _entity.id]" class="btn btn-sm btn-danger">Undo</a>
  <div *ngIf="options.progressBar">
    <div class="toast-progress" [style.width.%]="width"></div>
  </div>
  `,
  animations: [
    trigger('flyInOut', [
      state('inactive', style({
        display: 'none',
        opacity: 0
      })),
      state('active', style({
        opacity: 1
      })),
      state('removed', style({
        opacity: 0
      })),
      transition('inactive <=> active', animate('300ms ease-in')),
      transition('active <=> removed', animate('300ms ease-in')),
    ]),
  ],
})
export class ProjectCreatedToast extends EntityCreatedToast<Project, ProjectService> {

}
