import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { FormTemplateActions } from '../Actions/form-template.actions';
import { BASE_URL } from '../../Constants/settings';
import { Observable } from 'rxjs';
import { CustomHttp } from '../../Services/customHttp';
import { FormTemplate } from '../Models/form-template';
import { ToastConfig, ToastrService } from 'ngx-toastr';

@Injectable()
export class FormTemplateEffects {

  constructor(private actions: Actions, private chttp: CustomHttp, private toastService: ToastrService) { }

  @Effect() getFormTemplates = this.actions
    .ofType(FormTemplateActions.GET_FORM_TEMPLATES)
    .switchMap(_ => this.chttp.get(`${BASE_URL}/form_templates/`)
      .map(res => res.json())
      .map(res => res.form_templates)
      .switchMap(templates => Observable.of(FormTemplateActions.getAllSuccess(templates)))
      .catch(err => Observable.of(FormTemplateActions.getAllFail(err)))
    );

  @Effect() createFormTemplate = this.actions
    .ofType(FormTemplateActions.CREATE_FORM_TEMPLATE)
    .map(action => action.payload)
    .map(payload => JSON.stringify(payload))
    .switchMap(json => this.chttp.post(`${BASE_URL}/form_templates`, json)
      .map(res => res.json())
      .map(json => json.form_template)
      .switchMap(template => Observable.of(FormTemplateActions.createSuccess(template)))
      .catch(err => Observable.of(FormTemplateActions.createFail(err)))
    );

  @Effect({dispatch: false}) createFormTemplateSuccess = this.actions
    .ofType(FormTemplateActions.CREATE_FORM_TEMPLATE_SUCCESS)
    .map(action => action.payload)
    .do((template: FormTemplate) => {
      this.toastService.success(`Template "${template.name}" created!`, 'Success');
    });

  @Effect({dispatch: false}) createFormTemplateFail = this.actions
    .ofType(FormTemplateActions.CREATE_FORM_TEMPLATE_FAIL)
    .map(action => action.payload)
    .map(payload => payload._body)
    .map(body => JSON.parse(body))
    .map(json => json.errors)
    .do(errors => {

      let config: ToastConfig = {
        enableHtml: true,
        timeOut: 0,
        extendedTimeOut: 0,
        positionClass: 'toast-top-full-width',
        closeButton: true,
        tapToDismiss: true
      };

      let message = `These are the errors i detected:
        <ul>
      `;

      for (var property in errors) {
        if (errors.hasOwnProperty(property)) {
          message += `<li>${property} : ${errors[property]}</li>`
        }
      }

      message +='</ul>';

      this.toastService.error(message, 'I could not create your form template', config);
    });
}
