import { CedStoreModule } from '../..';
import { ServicesModule } from '../../../Services/services.module';
import { ToastrModule } from 'ngx-toastr/toastr';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { AssignmentEffects } from '../assignment.effects';
import { Assignment } from '../../Models/assignment';
import { ReadyState, BaseRequestOptions, ConnectionBackend, ResponseOptions, Response, Headers } from '@angular/http';
import { inject, TestBed } from '@angular/core/testing';
import { CustomHttp } from '../../../Services/customHttp';
import { AssignmentActions } from '../../Actions/assignment.actions';
import { Action } from '@ngrx/store';

describe('Effects: Assignment', () => {
  let backend: MockBackend;
  let runner : EffectsRunner;
  let effects: AssignmentEffects;
  let connections: MockConnection[];
  let testAssignments: Assignment[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EffectsTestingModule,
      ToastrModule.forRoot(),
      ServicesModule.forRoot(),
      CedStoreModule,
      CedStoreModule.provideStore()],
      providers: [
        AssignmentEffects,
        BaseRequestOptions, MockBackend, {
          provide: CustomHttp,
          useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
            return new CustomHttp(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    })
  });

  beforeEach(inject([EffectsRunner, AssignmentEffects], (er, ae) => {
    runner = er;
    effects = ae;
  }));

  beforeEach(() => {
    backend = TestBed.get(MockBackend);
    connections = [];
    testAssignments = [
      {
        id: 3,
        start_date: "2017-01-11",
        end_date: "2017-05-12",
        name: "Assignment 76.57752187873726",
        unit_id: 2,
        href: "/assignments/3"
      },
      {
        id: 2,
        start_date: "2017-01-11",
        end_date: "2017-06-06",
        name: "Assignment 92.51456657878248",
        unit_id: 1,
        href: "/assignments/2"
      }
    ];
  });

  afterEach(() => {
    let pendingConnections = connections.filter((c: MockConnection) => c.readyState === ReadyState.Open);
    if (pendingConnections.length > 0) {
      throw new Error(`There are ${pendingConnections.length} pending connections at the end of a test`);
    }
  });

  it('should dispatch LOAD_ASSIGNMENTS_FOR_UNIT_SUCCESS on successful get', () => {
    runner.queue(AssignmentActions.getAllForUnit(2));

    backend.connections.subscribe((c: MockConnection) => {
      connections.push(c);
      c.mockRespond(new Response(new ResponseOptions({ headers: new Headers(), body: { "assignments": [testAssignments[0]] } })));
    });

    effects.loadAssignmentsForUnit.subscribe((result: Action) => {
      expect(result.type).toEqual(AssignmentActions.LOAD_ASSIGNMENTS_FOR_UNIT_SUCCESS);
      expect(result.payload.assignments.length).toBeDefined();
      expect(result.payload.assignments.length).toBe(1);
      expect(result.payload.id).toBe(2);
    })

  });

});
