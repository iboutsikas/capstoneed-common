import { Action } from '@ngrx/store';
import { Project } from '../Models/project';
export class ProjectActions {
  public static readonly LOAD_PROJECTS = 'LOAD_PROJECTS';
  public static readonly LOAD_PROJECTS_SUCCESS = 'LOAD_PROJECTS_SUCCESS';
  public static readonly LOAD_PROJECTS_FAIL = 'LOAD_PROJECTS_FAIL';
  public static readonly LOAD_PROJECTS_FOR_UNIT = 'LOAD_PROJECTS_FOR_UNIT';
  public static readonly LOAD_PROJECTS_FOR_ASSIGNMENT = 'LOAD_PROJECTS_FOR_ASSIGNMENT';
  public static readonly LOAD_PROJECTS_FOR_UNIT_SUCCESS = 'LOAD_PROJECTS_FOR_UNIT_SUCCESS';
  public static readonly LOAD_PROJECTS_FOR_ASSIGNMENT_SUCCESS = 'LOAD_PROJECTS_FOR_ASSIGNMENT_SUCCESS';
  public static readonly LOAD_PROJECTS_FOR_UNIT_FAIL = 'LOAD_PROJECTS_FOR_UNIT_FAIL';
  public static readonly LOAD_PROJECTS_FOR_ASSIGNMENT_FAIL = 'LOAD_PROJECTS_FOR_ASSIGNMENT_FAIL';
  public static readonly DELETE_PROJECT = 'DELETE_PROJECT';
  public static readonly DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS';
  public static readonly DELETE_PROJECT_FAIL = 'DELETE_PROJECT_FAIL';
  public static readonly LOAD_PROJECT = 'LOAD_PROJECT';
  public static readonly LOAD_PROJECT_SUCCESS = 'LOAD_PROJECT_SUCCESS';
  public static readonly LOAD_PROJECT_FAIL = 'LOAD_PROJECT_FAIL';
  public static readonly CREATE_PROJECT = 'CREATE_PROJECT';
  public static readonly CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS';
  public static readonly CREATE_PROJECT_FAIL = 'CREATE_PROJECT_FAIL';
  public static readonly ENROLL_IN_PROJECT = 'ENROLL_IN_PROJECT';
  public static readonly ENROLL_IN_PROJECT_SUCCESS = 'ENROLL_IN_PROJECT_SUCCESS';
  public static readonly ENROLL_IN_PROJECT_FAIL = 'ENROLL_IN_PROJECT_FAIL';
  public static readonly REMOVE_STUDENT = 'REMOVE_STUDENT'
  public static readonly REMOVE_STUDENT_SUCCESS = 'REMOVE_STUDENT_SUCCESS'
  public static readonly REMOVE_STUDENT_FAIL = 'REMOVE_STUDENT_FAIL'

  public static getAllActive(): Action {
    return {
      type: ProjectActions.LOAD_PROJECTS
    }
  }

  public static getAllActiveSuccess(projects: Project[]): Action {
    return {
      type: ProjectActions.LOAD_PROJECTS_SUCCESS,
      payload: projects
    }
  }

  public static getAllActiveFail(): Action {
    return {
      type: ProjectActions.LOAD_PROJECTS_FAIL
    }
  }

  public static getAllActiveForUnit(unit_id: number): Action {
    return {
      type: ProjectActions.LOAD_PROJECTS_FOR_UNIT,
      payload: unit_id
    }
  }

  public static getAllActiveForAssignment(assignment_id: number): Action {
    return {
      type: ProjectActions.LOAD_PROJECTS_FOR_ASSIGNMENT,
      payload: assignment_id
    }
  }

  public static getAllActiveForUnitSuccess(projects: Project[], unit_id: number): Action {
    return {
      type: ProjectActions.LOAD_PROJECTS_FOR_UNIT_SUCCESS,
      payload: {
        projects: projects,
        unit_id: unit_id
      }
    }
  }

  public static getAllActiveForAssignmentSuccess(projects: Project[], assignment_id: number): Action {
    return {
      type: ProjectActions.LOAD_PROJECTS_FOR_ASSIGNMENT_SUCCESS,
      payload: {
        projects: projects,
        assignment_id: assignment_id
      }
    }
  }

  public static getAllActiveForUnitFail(): Action {
   return {
     type: ProjectActions.LOAD_PROJECTS_FOR_UNIT_FAIL
   }
  }

  public static getAllActigeForAssignmentFail(): Action {
    return {
      type: ProjectActions.LOAD_PROJECTS_FOR_ASSIGNMENT_FAIL
    }
  }

  public static deleteProject(project_id: number): Action {
    return {
      type: ProjectActions.DELETE_PROJECT,
      payload: project_id
    }
  }

  public static deleteProjectSuccess(project_id: number): Action {
    return {
      type: ProjectActions.DELETE_PROJECT_SUCCESS,
      payload: project_id
    }
  }

  public static deleteProjectFail(): Action {
    return {
      type: ProjectActions.DELETE_PROJECT_FAIL
    }
  }

  public static get(project_id: number): Action {
    return {
      type: ProjectActions.LOAD_PROJECT,
      payload: project_id
    }
  }

  public static getSuccess(new_project: Project): Action {
    return {
      type: ProjectActions.LOAD_PROJECT_SUCCESS,
      payload: new_project
    }
  }

  public static getFail(): Action {
    return {
      type: ProjectActions.LOAD_PROJECT_FAIL
    }
  }

  public static create(new_project: Project): Action {
    return {
      type: ProjectActions.CREATE_PROJECT,
      payload: new_project
    }
  }

  public static createSuccess(new_project: Project): Action {
    return {
      type: ProjectActions.CREATE_PROJECT_SUCCESS,
      payload: new_project
    }
  }

  public static createFail(err: any): Action {
    return {
      type: ProjectActions.CREATE_PROJECT_FAIL,
      payload: err
    }
  }

  public static enroll(key: string, nickname: string, id: number): Action {
    return {
      type: ProjectActions.ENROLL_IN_PROJECT,
      payload: { key: key, nickname: nickname, id: id }
    }
  }

  public static enrollSuccess(project: Project): Action {
    return {
      type: ProjectActions.ENROLL_IN_PROJECT_SUCCESS,
      payload: project
    }
  }

  public static enrollFail(err: any): Action {
    return {
      type: ProjectActions.ENROLL_IN_PROJECT_FAIL,
      payload: err
    }
  }

  public static removeStudent(project_id: number, student_id: number) {
    return {
      type: ProjectActions.REMOVE_STUDENT,
      payload: { project_id: project_id, student_id: student_id }
    }
  }

  public static removeStudentSuccess(project_id: number, student_id: number) {
    return {
      type: ProjectActions.REMOVE_STUDENT_SUCCESS,
      payload: { project_id: project_id, student_id: student_id }
    }
  }

  public static removeStudentFail(err: any) {
    return {
      type: ProjectActions.REMOVE_STUDENT_FAIL,
      payload: err
    }
  }

}
