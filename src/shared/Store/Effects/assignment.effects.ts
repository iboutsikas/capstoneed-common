import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { AssignmentActions } from '../Actions/assignment.actions';
import { CustomHttp } from '../../Services/customHttp';
import { BASE_URL, THROTTLE_TIME } from '../../Constants/settings';
import { UserActions } from '../Actions/user.actions';
import { ToastrService, ToastConfig } from 'ngx-toastr';
import { AssignmentCreatedToast } from '../../Directives/toasts/assignment-created.toast';
import { AssignmentService } from '../../Services/assignment.service';

@Injectable()
export class AssignmentEffects {
  constructor(private actions: Actions, private chttp: CustomHttp, private toastrService: ToastrService, private assignmentService: AssignmentService) {

  }

  @Effect() loadAssignmentsForUnit = this.actions
    .ofType(AssignmentActions.LOAD_ASSIGNMENTS_FOR_UNIT)
    .throttleTime(THROTTLE_TIME)
    .map(action => action.payload)
    .switchMap(unitId => this.chttp.get(`${BASE_URL}/assignments?unit_id=${unitId}&includes=unit&compact=true`)
      .map(res => res.json())
      .switchMap(json => Observable.of(AssignmentActions.loadAssignmentsForUnitSuccess(json.assignments, unitId)))
      .catch(err => Observable.of(AssignmentActions.loadAssignmentsForUnitFail(unitId)))
    );

  @Effect() loadAssignments = this.actions
    .ofType(AssignmentActions.LOAD_ASSIGNMENTS)
    .throttleTime(THROTTLE_TIME)
    .switchMap(action => this.chttp.get(`${BASE_URL}/assignments?includes=unit&compact=true`)
      .map(res => res.json())
      .map(json => json.assignments)
      .switchMap(assignments => Observable.of(AssignmentActions.loadAssignmentsSuccess(assignments)))
      .catch(err => Observable.of(AssignmentActions.loadAssignmentsFail()))
    );

  @Effect() loadAssignment = this.actions
    .ofType(AssignmentActions.LOAD_ASSIGNMENT)
    .throttleTime(THROTTLE_TIME)
    .map(action => action.payload)
    .switchMap(id => this.chttp.get(`${BASE_URL}/assignments/${id}?includes=unit&compact=true`)
      .map(res => res.json())
      .map(json => json.assignment)
      .switchMap(assignment => Observable.of(AssignmentActions.loadAssignmentSuccess(assignment)))
      .catch(err => Observable.of(AssignmentActions.loadAssignmentFail()))
    );

  @Effect() autoloadAssignmentsOnLogin = this.actions
    .ofType(UserActions.USER_LOGIN_SUCCESS)
    .do(console.log)
    .switchMap(action => Observable.of(AssignmentActions.loadAssignments()));

  @Effect() createNewAssignment = this.actions
    .ofType(AssignmentActions.CREATE_ASSIGNMENT)
    .map(action => action.payload)
    .map(payload => JSON.stringify(payload))
    .switchMap(json => this.chttp.post(`${BASE_URL}/assignments`, json)
      .map(res => res.json())
      .map(json => json.assignment)
      .switchMap(assignment => Observable.of(AssignmentActions.createAssignmentSuccess(assignment)))
      .catch(err => Observable.of(AssignmentActions.createAssignmentFail(JSON.parse(err._body))))
    );

  @Effect({ dispatch: false }) createdToast = this.actions
    .ofType(AssignmentActions.CREATE_ASSIGNMENT_SUCCESS)
    .map(action => action.payload)
    .do(assignment => {
      let config: ToastConfig = {
        toastComponent: AssignmentCreatedToast
      };
      let result = this.toastrService.success('I successfully created your assignment', 'Success', config);

      (result.portal.instance as AssignmentCreatedToast).entity = assignment;
      (result.portal.instance as AssignmentCreatedToast).service = this.assignmentService;
    });

  @Effect({ dispatch: false }) createdFailedToast = this.actions
    .ofType(AssignmentActions.CREATE_ASSIGNMENT_FAIL)
    .map(action => action.payload)
    .map(err => err.errors)
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

      this.toastrService.error(message, 'I could not create your assignment', config);

    })
}
