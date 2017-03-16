import { MockBackend, MockConnection } from '@angular/http/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { ProjectEffects } from '../project.effects';
import { BaseRequestOptions, ConnectionBackend, ReadyState, Response, ResponseOptions, Headers } from '@angular/http';
import { CustomHttp } from '../../../Services/customHttp';
import { TestBed } from '@angular/core/testing';
import { Project } from '../../Models/project';
import { ProjectActions } from '../../Actions/project.actions';
import { Action } from '@ngrx/store';


describe('Effects: Projects', () => {
  let backend: MockBackend;
  let runner : EffectsRunner;
  let effects: ProjectEffects;
  let connections: MockConnection[];
  let testProjects: Project[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EffectsTestingModule],
      providers: [
        ProjectEffects,
        BaseRequestOptions, MockBackend, {
          provide: CustomHttp,
          useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
            return new CustomHttp(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

  beforeEach(() => {
    backend = TestBed.get(MockBackend);
    runner = TestBed.get(EffectsRunner);
    effects = TestBed.get(ProjectEffects);
    connections = [];
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

  afterEach(() => {
    let pendingConnections = connections.filter((c: MockConnection) => c.readyState === ReadyState.Open);
    if (pendingConnections.length > 0) {
      throw new Error(`There are ${pendingConnections.length} pending connections at the end of a test`);
    }
  });

  it('should dispatch a LOAD_PROJECTS_FOR_UNIT_SUCCESS on successful API /GET', () => {
    runner.queue(ProjectActions.loadProjectsForUnit(4));

    backend.connections.subscribe((c: MockConnection) => {
      connections.push(c);
      c.mockRespond(new Response(new ResponseOptions({ headers: new Headers(), body: { "projects": testProjects } })));
    });

    effects.loadProjectsForUnit.subscribe((result: Action) => {
      expect(result.type).toEqual(ProjectActions.LOAD_PROJECTS_FOR_UNIT_SUCCESS);
    });

  });

  it('should dispatch a LOAD_PROJECTS_FOR_UNIT_FAIL on failed API /GET', () => {
    runner.queue(ProjectActions.loadProjectsForUnit(4));

    backend.connections.subscribe((c: MockConnection) => {
      connections.push(c);
      c.mockRespond(new Response(new ResponseOptions({ status: 401 })));
    });

    effects.loadProjectsForUnit.subscribe((result: Action) => {
      expect(result.type).toEqual(ProjectActions.LOAD_PROJECTS_FOR_UNIT_FAIL);
    });

  });

  it('should dispatch a LOAD_PROJECTS_FOR_ASSIGNMENT_SUCCESS on successful API /GET', () => {
    runner.queue(ProjectActions.loadProjectsForAssignment(4));

    backend.connections.subscribe((c: MockConnection) => {
      connections.push(c);
      c.mockRespond(new Response(new ResponseOptions({ headers: new Headers(), body: { "projects": testProjects } })));
    });

    effects.loadProjectsForAssignment.subscribe((result: Action) => {
      expect(result.type).toEqual(ProjectActions.LOAD_PROJECTS_FOR_ASSIGNMENT_SUCCESS);
    });

  });

  it('should dispatch a LOAD_PROJECTS_FOR_ASSIGNMENT_FAIL on failed API /GET', () => {
    runner.queue(ProjectActions.loadProjectsForAssignment(4));

    backend.connections.subscribe((c: MockConnection) => {
      connections.push(c);
      c.mockRespond(new Response(new ResponseOptions({ status: 401 })));
    });

    effects.loadProjectsForAssignment.subscribe((result: Action) => {
      expect(result.type).toEqual(ProjectActions.LOAD_PROJECTS_FOR_ASSIGNMENT_FAIL);
    });

  });

  it('should have correct data on LOAD_PROJECTS_FOR_UNIT_SUCCESS', () => {
    runner.queue(ProjectActions.loadProjectsForUnit(4));

    backend.connections.subscribe((c: MockConnection) => {
      connections.push(c);
      c.mockRespond(new Response(new ResponseOptions({ headers: new Headers(), body: { "projects": testProjects } })));
    });

    effects.loadProjectsForUnit.subscribe((result: Action) => {
      expect(result.type).toEqual(ProjectActions.LOAD_PROJECTS_FOR_UNIT_SUCCESS);
      expect(result.payload.projects.length).toBe(testProjects.length);
      expect(result.payload.projects[0].id).toEqual(testProjects[0].id);
    });

  });

  it('should have correct data on LOAD_PROJECTS_FOR_ASSIGNMENT_SUCCESS', () => {
    runner.queue(ProjectActions.loadProjectsForUnit(4));

    backend.connections.subscribe((c: MockConnection) => {
      connections.push(c);
      c.mockRespond(new Response(new ResponseOptions({ headers: new Headers(), body: { "projects": testProjects } })));
    });

    effects.loadProjectsForAssignment.subscribe((result: Action) => {
      expect(result.type).toEqual(ProjectActions.LOAD_PROJECTS_FOR_ASSIGNMENT_SUCCESS);
      expect(result.payload.length).toBe(testProjects.length);
      expect(result.payload[0].id).toEqual(testProjects[0].id);
    });

  });

  it('should dispatch a LOAD_PROJECT_SUCCESS on successful API /GET', () => {
    runner.queue(ProjectActions.loadProject(1));

    backend.connections.subscribe((c: MockConnection) => {
      connections.push(c);
      c.mockRespond(new Response(new ResponseOptions({ headers: new Headers(), body: { "project": testProjects[0]} })));
    });

    effects.loadProject.subscribe((a: Action) => {
      expect(a.type).toEqual(ProjectActions.LOAD_PROJECT_SUCCESS);
    });
  });

  it('should have the correct data on LOAD_PROJECT_SUCCESS', () => {
    runner.queue(ProjectActions.loadProject(1));

    backend.connections.subscribe((c: MockConnection) => {
      connections.push(c);
      c.mockRespond(new Response(new ResponseOptions({ headers: new Headers(), body: { "project": testProjects[0]} })));
    });

    effects.loadProject.subscribe((a: Action) => {
      expect(a.type).toEqual(ProjectActions.LOAD_PROJECT_SUCCESS);
      expect(a.payload.id).toEqual(testProjects[0].id);
      expect(a.payload.project_name).toEqual(testProjects[0].project_name);
    });
  });

  it('should dispatch a LOAD_PROJECT_FAIL on failed API /GET', () => {
    runner.queue(ProjectActions.loadProject(5));

    backend.connections.subscribe((c: MockConnection) => {
      connections.push(c);
      c.mockRespond(new Response(new ResponseOptions({ status: 401 })));
    });

    effects.loadProject.subscribe((a: Action) => {
      expect(a.type).toEqual(ProjectActions.LOAD_PROJECT_FAIL);
    });

  });

  it('should dispatch DELETE_PROJECT_SUCCESS on successful API /DELETE', () => {
    runner.queue(ProjectActions.deleteProject(8));

    backend.connections.subscribe((c: MockConnection) => {
      connections.push(c);
      c.mockRespond(new Response(new ResponseOptions({ headers: new Headers(), body: {}, status: 204 })));
    });

    effects.deleteProject.subscribe((a: Action) => {
      expect(a.type).toEqual(ProjectActions.DELETE_PROJECT_SUCCESS);
    });
  });

  it('DELETE_PROJECT_SUCCESS should have the correct id', () => {
    runner.queue(ProjectActions.deleteProject(18));

    backend.connections.subscribe((c: MockConnection) => {
      connections.push(c);
      c.mockRespond(new Response(new ResponseOptions({ headers: new Headers(), body: {}, status: 204 })));
    });

    effects.deleteProject.subscribe((a: Action) => {
      expect(a.type).toEqual(ProjectActions.DELETE_PROJECT_SUCCESS);
      expect(a.payload).toBe(18);
    });
  });

  it('should dispatch DELETE_PROJECT_FAIL on failed API /DELETE', () => {
    runner.queue(ProjectActions.deleteProject(18));

    backend.connections.subscribe((c: MockConnection) => {
      connections.push(c);
      c.mockRespond(new Response(new ResponseOptions({ status: 401 })));
    });

    effects.deleteProject.subscribe((a: Action) => {
      expect(a.type).toEqual(ProjectActions.DELETE_PROJECT_FAIL);
    });
  });

  it('REMOVE_STUDENT_SUCCESS should have the correct id', () => {
    runner.queue(ProjectActions.removeStudent(1, 4));

    backend.connections.subscribe((c: MockConnection) => {
      connections.push(c);
      c.mockRespond(new Response(new ResponseOptions({ headers: new Headers(), body: {}, status: 204 })));
    });

    effects.removeStudentFromProject.subscribe((a: Action) => {
      expect(a.type).toEqual(ProjectActions.REMOVE_STUDENT_SUCCESS);
      expect(a.payload['project_id']).toBe(1);
      expect(a.payload['student_id']).toBe(4);      
    });
  });  

  it('should dispach REMOVE_STUDENT_FAIL on error 401 (not authenticated)', () => {
    runner.queue(ProjectActions.removeStudent(5, 4));

    backend.connections.subscribe((c: MockConnection) => {
      connections.push(c);
      c.mockRespond(new Response(new ResponseOptions({ headers: new Headers(), body: { errors: { base: ["Authentication Failed"] } }, status: 401 })));
    });

    effects.removeStudentFromProject.subscribe((a: Action) => {
      expect(a.type).toEqual(ProjectActions.REMOVE_STUDENT_FAIL);
      expect(a.payload['errors']['base'][0]).toContain("Authentication Failed");
    });
  });   

  it('should dispach REMOVE_STUDENT_FAIL on error 403 (not authorized to access the endpoint)', () => {
    runner.queue(ProjectActions.removeStudent(5, 4));

    backend.connections.subscribe((c: MockConnection) => {
      connections.push(c);
      c.mockRespond(new Response(new ResponseOptions({ headers: new Headers(), body: { errors: { base: ["This Project is not associated with the current user"] } }, status: 403 })));
    });

    effects.removeStudentFromProject.subscribe((a: Action) => {
      expect(a.type).toEqual(ProjectActions.REMOVE_STUDENT_FAIL);
      expect(a.payload['errors']['base'][0]).toContain("not associated");
    });
  });   

});

