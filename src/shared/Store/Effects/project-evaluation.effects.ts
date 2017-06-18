import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { CustomHttp } from '../../Services/customHttp';
import { ToastrConfig, ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../Services/project.service';
import { ProjectEvaluationActions } from '../Actions/project-evaluation.actions';
import { BASE_URL } from '../../Constants/settings';
import { Observable } from 'rxjs';
import { UserActions } from '../Actions/user.actions';
import { UserType } from '../Models/user';
import { User } from "../index";

@Injectable()
export class ProjectEvaluationEffects {

  constructor(private actions: Actions, private chttp: CustomHttp, private toastrService: ToastrService, private projectService: ProjectService){
  }

  @Effect() autoLoad = this.actions
    .ofType(UserActions.USER_LOGIN_SUCCESS)
    .map(action => action.payload)
    .filter((user: User) => user.type === UserType.STUDENT)
    .throttleTime(450)
    .switchMap(_ => Observable.of(ProjectEvaluationActions.getPending()));

  @Effect() loadPeding = this.actions
    .ofType(ProjectEvaluationActions.GET_PENDING_EVALUATION)
    .switchMap(action => this.chttp.get(`${BASE_URL}/project-evaluations`)
      .map(res => res.json())
      .map(json => json.pending_evaluations)
      .switchMap(evals => Observable.of(ProjectEvaluationActions.getPendingSucces(evals)))
      .catch(err => Observable.of(ProjectEvaluationActions.getPendingFail(err)))
    );

  private createEvaluation$ = this.actions
    .ofType(ProjectEvaluationActions.SUBMIT_PROJECT_EVALUATION)
    .map(action => action.payload)
    .switchMap(evaluation => {
      let json = JSON.stringify(evaluation);

      return this.chttp.post(`${BASE_URL}/projects/${evaluation.project_id}/evaluations`, json)
        .map(res => res.json())

    })
    .share();

  @Effect() createEvaluation = this.createEvaluation$
    .map(json => json.project_evaluation)
    .switchMap(ev => Observable.of(ProjectEvaluationActions.submitProjectEvaluationSuccess(ev)))
    .catch(err => Observable.of(ProjectEvaluationActions.submitProjectEvaluationFail(err)));

  @Effect() createEvaluationToast = this.createEvaluation$
    .do(json => {
      let config: ToastrConfig = {
        autoDismiss: false,
        timeOut: 0
      };

      let points = json.points.points_earned || 0;
      let exp = json.xp.xp_earned || 0;

      this.toastrService.success(`You earned ${points} points for your team, and got ${exp}XP`, 'Success', config);
    })
    .switchMap(json => {
      let xp = json.xp;
      return Observable.of(UserActions.userGainedXP(xp));
    });
}
