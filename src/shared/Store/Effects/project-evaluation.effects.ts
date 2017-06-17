import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { CustomHttp } from '../../Services/customHttp';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../Services/project.service';
import { ProjectEvaluationActions } from '../Actions/project-evaluation.actions';
import { BASE_URL } from '../../Constants/settings';
import { Observable } from 'rxjs';

@Injectable()
export class ProjectEvaluationEffects {

  constructor(private actions: Actions, private chttp: CustomHttp, private toastrService: ToastrService, private projectService: ProjectService){
  }

  @Effect() loadPeding = this.actions
    .ofType(ProjectEvaluationActions.GET_PENDING_EVALUATION)
    .switchMap(action => this.chttp.get(`${BASE_URL}/project-evaluations`)
      .map(res => res.json())
      .map(json => json.pending_evaluations)
      .switchMap(evals => Observable.of(ProjectEvaluationActions.getPendingSucces(evals)))
      .catch(err => Observable.of(ProjectEvaluationActions.getPendingFail(err)))
    )
}
