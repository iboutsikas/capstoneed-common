import { Project } from '../../Models/project';
import { projectsReducer } from '../project.reducer';
import { Action } from '@ngrx/store';
import { UserActions } from '../../Actions/user.actions';
import { ProjectActions } from '../../Actions/project.actions';

describe('Reducer: Projects', () => {
  let state: Project[];
  let testProjects: Project[];

  beforeEach(() => {
    state = [];
    testProjects = [
      {
        id: 1,
        assignment_id: 3,
        unit_id: 5,
        project_name: "Project 68",
        team_name: "The xmen68",
        description: "Lorem ipsum dolor sit amet, pri in erant detracto antiopam, duis altera nostrud id eam. Feugait invenire ut vim, novum reprimique reformidans id vis, sit at quis hinc liberavisse. Eam ex sint elaboraret assueverit, sed an equidem reformidans, idque doming ut quo. Ex aperiri labores has, dolorem indoctum hendrerit has cu. At case posidonium pri.",
        logo: null,
        enrollment_key: "c53748d8339ec99135bdc652510aaa09"
      },
      {
        id: 2,
        assignment_id: 4,
        unit_id: 2,
        project_name: "Project 69",
        team_name: "The xmen69",
        description: "Lorem ipsum dolor sit amet, pri in erant detracto antiopam, duis altera nostrud id eam. Feugait invenire ut vim, novum reprimique reformidans id vis, sit at quis hinc liberavisse. Eam ex sint elaboraret assueverit, sed an equidem reformidans, idque doming ut quo. Ex aperiri labores has, dolorem indoctum hendrerit has cu. At case posidonium pri.",
        logo: null,
        enrollment_key: "94f55ab707b1f53c8640cae29cffdf15"
      },
      {
        id: 3,
        assignment_id: 4,
        unit_id: 3,
        project_name: "Project 70",
        team_name: "The xmen70",
        description: "Lorem ipsum dolor sit amet, pri in erant detracto antiopam, duis altera nostrud id eam. Feugait invenire ut vim, novum reprimique reformidans id vis, sit at quis hinc liberavisse. Eam ex sint elaboraret assueverit, sed an equidem reformidans, idque doming ut quo. Ex aperiri labores has, dolorem indoctum hendrerit has cu. At case posidonium pri.",
        logo: null,
        enrollment_key: "26e8b9ac91b251d8b76a6d063d009878"
      }
    ];
  });

  it('should add the projects of a unit along with the existing ones', () => {
    state.push(testProjects[0]);
    state.push(testProjects[2]);
    expect(state.length).toBe(2);

    let action = ProjectActions.loadProjectsForUnitSuccess([testProjects[1]], 2);

    let actual = projectsReducer(state, action);

    expect(actual.length).toBe(3);
  });

  it('should add the projects of an assignment along with the existing ones', () => {
    state.push(testProjects[0]);
    state.push(testProjects[2]);
    expect(state.length).toBe(2);

    let action = ProjectActions.loadProjectsForAssignmentSuccess([testProjects[1]], 4);

    let actual = projectsReducer(state, action);

    expect(actual.length).toBe(2);
  });

  it('should add the projects of a unit only once', () => {
    state = testProjects;
    expect(state.length).toBe(testProjects.length);
    let action = ProjectActions.loadProjectsForUnitSuccess([testProjects[1]], 2);

    let actual = projectsReducer(state, action);

    expect(actual.length).toBe(testProjects.length);

    let projectsForUnit2 = actual.filter((p: Project) => p.unit_id == 2);
    expect(projectsForUnit2.length).toBe(1);
  });

  it('should add the projects of an assignment only once', () => {
    state = testProjects;
    expect(state.length).toBe(testProjects.length);
    let action = ProjectActions.loadProjectsForAssignmentSuccess([testProjects[1]], 4);

    let actual = projectsReducer(state, action);

    expect(actual.length).toBe(2);

    let projectsForAssignment4 = actual.filter((p: Project) => p.assignment_id == 4);
    expect(projectsForAssignment4.length).toBe(1);
  });

  it('should remove a deleted project', () => {
    state = testProjects;

    let action = ProjectActions.deleteProjectSuccess(2);

    let actual = projectsReducer(state, action);

    expect(actual.length).toBe(2);

    let removedPtojects = actual.filter((p: Project) => p.id == 2);

    expect(removedPtojects.length).toBe(0);

  });

  it('should unload all units on user logout', () => {
    let action: Action = {
      type: UserActions.USER_LOGOUT_SUCCESS
    };

    state = testProjects;

    let actual = projectsReducer(state, action);

    expect(actual.length).toBe(0);
  });

});
