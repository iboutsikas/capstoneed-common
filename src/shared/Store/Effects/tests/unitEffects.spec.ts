import { TestBed, inject } from '@angular/core/testing';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { UnitEffects } from '../unitEffects';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, ConnectionBackend, ResponseOptions, Response, Headers, ReadyState } from '@angular/http';
import { CustomHttp } from '../../../Services/customHttp';
import { UnitActions } from '../../Actions/unitActions';
import { Unit } from '../../Models/unit';
import { Action } from '@ngrx/store';

describe('Effects: Unit', () => {
  let backend: MockBackend;
  let runner : EffectsRunner;
  let effects: UnitEffects;
  let connections: MockConnection[];
  let testUnits: Unit[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EffectsTestingModule],
      providers: [
        UnitEffects,
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

  beforeEach(inject([EffectsRunner, UnitEffects], (er, ue) => {
    runner = er;
    effects = ue;
  }));

  beforeEach(() => {
    backend = TestBed.get(MockBackend);
    connections = [];
    testUnits = [
      {
        id: 2,
        name: "Unit 436",
        code: "DvSu6c+9DzWZ2A==",
        semester: "Autumn",
        year: 2014,
        archived_at: null,
        department: {
          id: 2,
          university: "University of 67995",
          name: "Computer Science17858"
        }
      },
      {
        id: 1,
        name: "Unit 568",
        code: "2hkwFUu7zNOvyw==",
        semester: "Spring",
        year: 2015,
        archived_at: null,
        department: {
          id: 1,
          university: "University of 35362",
          name: "Computer Science21265"
        }
      }
    ];
  });

  afterEach(() => {
    let pendingConnections = connections.filter((c: MockConnection) => c.readyState === ReadyState.Open);
    if (pendingConnections.length > 0) {
      throw new Error(`There are ${pendingConnections.length} pending connections at the end of a test`);
    }
  });

  it('should dispatch LOAD_UNITS_SUCCESS on successful get', () => {
    runner.queue(UnitActions.loadUnits());

    backend.connections.subscribe((c: MockConnection) => {
      connections.push(c);
      c.mockRespond(new Response(new ResponseOptions({ headers: new Headers(), body: { "units": testUnits } })));
    });

    effects.loadUnits$.subscribe((result: Action) => {
      expect(result.type).toEqual(UnitActions.LOAD_UNITS_SUCCESS);
      expect(result.payload.length).toBeDefined();
      expect(result.payload.length).toBe(testUnits.length);
      expect(result.payload).toEqual(testUnits);
    });
  });



});
