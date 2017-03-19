import { ProjectActions } from '../project.actions';
import { Project } from '../../Models/project';

describe('Actions: Project', () => {

  let testProjects: Project[];

  beforeEach(() => {
    testProjects = [
      {
        id: 1,
        assignment_id: 4,
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

  it('should create LOAD_PROJECTS_FOR_UNIT action', () => {
    let actual = ProjectActions.getAllActiveForUnit(5);

    expect(actual.type).toBe(ProjectActions.LOAD_PROJECTS_FOR_UNIT);
    expect(actual.payload).toBe(5)
  });

  it('should create LOAD_PROJECTS_FOR_ASSIGNMENT action', () => {
    let actual = ProjectActions.getAllActiveForAssignment(8);

    expect(actual.type).toBe(ProjectActions.LOAD_PROJECTS_FOR_ASSIGNMENT);
    expect(actual.payload).toBe(8)
  });

  it('should create LOAD_PROJECTS_FOR_UNIT_SUCCESS action', () => {
    let actual = ProjectActions.getAllActiveForUnitSuccess(testProjects, 10);

    expect(actual.type).toBe(ProjectActions.LOAD_PROJECTS_FOR_UNIT_SUCCESS);
    expect(actual.payload.projects.length).toBe(testProjects.length);
    expect(actual.payload.unit_id).toBe(10);
  });

  it('should create LOAD_PROJECTS_FOR_ASSIGNMENT_SUCCESS action', () => {
    let actual = ProjectActions.getAllActiveForAssignmentSuccess(testProjects, 20);

    expect(actual.type).toBe(ProjectActions.LOAD_PROJECTS_FOR_ASSIGNMENT_SUCCESS);
    expect(actual.payload.projects.length).toBe(testProjects.length);
    expect(actual.payload.assignment_id).toBe(20);
  });

  it('should create LOAD_PROJECTS_FOR_UNIT_FAIL action', () => {
    let actual = ProjectActions.getAllActiveForUnitFail();

    expect(actual.type).toBe(ProjectActions.LOAD_PROJECTS_FOR_UNIT_FAIL);
  });

  it('should create LOAD_PROJECTS_FOR_ASSIGNMENT_FAIL action', () => {
    let actual = ProjectActions.getAllActigeForAssignmentFail();

    expect(actual.type).toBe(ProjectActions.LOAD_PROJECTS_FOR_ASSIGNMENT_FAIL);
  });

  it('should create DELETE_PROJECT action', () => {
    let actual = ProjectActions.deleteProject(6);

    expect(actual.type).toBe(ProjectActions.DELETE_PROJECT);
    expect(actual.payload).toBe(6);
  });

  it('should create DELETE_PROJECT_SUCCESS action', () => {
    let actual = ProjectActions.deleteProjectSuccess(6);

    expect(actual.type).toBe(ProjectActions.DELETE_PROJECT_SUCCESS);
    expect(actual.payload).toBe(6);
  });

  it('should create DELETE_PROJECT_FAIL action', () => {
    let actual = ProjectActions.deleteProjectFail();

    expect(actual.type).toBe(ProjectActions.DELETE_PROJECT_FAIL);
  });

  it('should create LOAD_PROJECT action', () => {
    let actual = ProjectActions.get(6);

    expect(actual.type).toBe(ProjectActions.LOAD_PROJECT);
    expect(actual.payload).toBe(6);
  });

  it('should create LOAD_PROJECT_SUCCESS action', () => {
    let actual = ProjectActions.getSuccess(testProjects[2]);

    expect(actual.type).toBe(ProjectActions.LOAD_PROJECT_SUCCESS);
    expect(actual.payload).toEqual(testProjects[2]);
  });

  it('should create LOAD_PROJECT_FAIL action', () => {
    let actual = ProjectActions.getFail();

    expect(actual.type).toBe(ProjectActions.LOAD_PROJECT_FAIL);
  });

  it('should create REMOVE_STUDENT action', () => {
    let actual = ProjectActions.removeStudent(1, 2);

    expect(actual.type).toBe(ProjectActions.REMOVE_STUDENT);
    expect(actual.payload['project_id']).toEqual(1);
    expect(actual.payload['student_id']).toEqual(2);
  });

  it('should create REMOVE_STUDENT_SUCCESS action', () => {
    let actual = ProjectActions.removeStudentSuccess(1, 2);

    expect(actual.type).toBe(ProjectActions.REMOVE_STUDENT_SUCCESS);
    expect(actual.payload['project_id']).toEqual(1);
    expect(actual.payload['student_id']).toEqual(2);
  });

  it('should create REMOVE_STUDENT_FAIL action', () => {
    let actual = ProjectActions.removeStudentFail({ error: 'error' });

    expect(actual.type).toBe(ProjectActions.REMOVE_STUDENT_FAIL);
  });
});
