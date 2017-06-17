import { combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core';
import { userReducer } from './user.reducer';
import { User } from '../Models/user';
import { Unit } from '../Models/unit';
import { unitsReducer } from './unit.reducer';
import { Assignment } from '../Models/assignment';
import { assignmentsReducer } from './assignment.reducer';
import { Project } from '../Models/project';
import { projectsReducer } from './project.reducer';
import { PeerAssessmentForm } from '../Models/peer-assessment-form';
import { pa_formReducer } from './peer-assessment-form.reducer';
import { Iteration } from '../Models/iteration';
import { iterationsReducer } from './iteration.reducer';
import { LogEntry } from '../Models/log-entry';
import { logEntryReducer } from './log-entry.reducer';
import { QuestionType } from '../Models/question-type';
import { questionTypeReducer } from './question-type.reducer';
import { Question } from '../Models/question';
import { questionsReducer } from "./question.reducer";
import { formTemplateReducer } from './form-template.reducer';
import { FormTemplate } from '../Models/form-template';
import { projectRankingReducer } from './project-ranking.reducer';
import { ProjectRanking } from '../Models/project-ranking';
import { ProjectEvaluation } from '../Models/project-evaluation';
import { project_evaluationReducer } from './project-evaluation.reducer';
import { scored_iterationsReducer } from "./scored-iterations.reducer";

export interface IAppState {
  user: User;
  units: Unit[];
  assignments: Assignment[];
  projects: Project[];
  pa_forms: PeerAssessmentForm[];
  iterations: Iteration[];
  logs: LogEntry[];
  question_types: QuestionType[];
  questions: Question[];
  form_templates: FormTemplate[];
  project_rankings: ProjectRanking[];
  project_evaluations: ProjectEvaluation[];
  scored_iterations: Iteration[];
}

export default compose(combineReducers)({
  user: userReducer,
  units: unitsReducer,
  assignments: assignmentsReducer,
  projects: projectsReducer,
  pa_forms: pa_formReducer,
  iterations: iterationsReducer,
  logs: logEntryReducer,
  question_types: questionTypeReducer,
  questions: questionsReducer,
  form_templates: formTemplateReducer,
  project_rankings: projectRankingReducer,
  project_evaluations: project_evaluationReducer,
  scored_iterations: scored_iterationsReducer
})
