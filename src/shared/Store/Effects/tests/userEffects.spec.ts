import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, inject } from '@angular/core/testing';
import { UserEffects } from '../userEffects';
import { CustomHttp } from '../../../Services/customHttp';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, ConnectionBackend, ResponseOptions, Response, Headers } from '@angular/http';
import { User, UserType } from '../../Models/user';
import { UserActions } from '../../Actions/userActions';

describe('Effects: User', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [EffectsTestingModule],
    providers: [
      UserEffects,
      UserActions,
      BaseRequestOptions, MockBackend, {
        provide: CustomHttp,
        useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
          return new CustomHttp(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      }
    ]
  }));

  var http: CustomHttp;
  var backend: MockBackend;
  let runner: EffectsRunner;
  let userEffects: UserEffects;

  beforeEach(inject([EffectsRunner, UserEffects], (er, ue) => {
    runner = er;
    userEffects = ue;
  }));

  beforeEach(() => {
    http = TestBed.get(CustomHttp);
    backend = TestBed.get(MockBackend);
  });

  it('should return USER_LOGIN_SUCCESS after successful login', () => {
    runner.queue({ type:'USER_LOGIN', payload: { email: 'foo@bar.com', password: '12345678', rememberMe: '1' } });
    let user = {
      id: 33639,
      type: UserType.STUDENT,
      first_name: "Mireille",
      last_name: "Buckridge",
      email: "estelle@hotmail.com"
    };

    backend.connections.subscribe((c: MockConnection) => {
      // let user: User = {
      //   id: 33639,
      //   type: UserType.STUDENT,
      //   first_name: "Mireille",
      //   last_name: "Buckridge",
      //   email: "estelle@hotmail.com"
      // };

      c.mockRespond(new Response(new ResponseOptions({ headers: new Headers(), body: { "user": user } })))
    });

    userEffects.login$.subscribe(result => {
      console.log(result);
      expect(result.type).toEqual("USER_LOGIN_SUCCESS");
      expect(result.payload).toEqual(user);
    });
  });

  it('should return USER_LOGIN_FAIL on failed login', () => {
    runner.queue({ type:'USER_LOGIN', payload: { email: 'foo@bar.com', password: '12345678', rememberMe: '1' } });

    backend.connections.subscribe((c: MockConnection) => {
      c.mockRespond(new Response(new ResponseOptions({ status: 401 })));
    });

    userEffects.login$.subscribe(result => {
      expect(result.type).toEqual(UserActions.USER_LOGIN_FAIL);
    });
  });

  it('should return USER_LOGOUT_SUCCESS on successful logout', () => {
    runner.queue({ type: UserActions.USER_LOGOUT });

    backend.connections.subscribe((c: MockConnection) => {
      c.mockRespond(new Response(new ResponseOptions({ headers: new Headers(), status: 204, body: {} })))
    });

    userEffects.logout$.subscribe(result => {
      expect(result.type).toEqual(UserActions.USER_LOGOUT_SUCCESS);
    });
  });

  it('should return USER_LOGOUT_FAIL on failed logout', () => {
    runner.queue({ type: UserActions.USER_LOGOUT });

    backend.connections.subscribe((c: MockConnection) => {
      c.mockRespond(new Response(new ResponseOptions({ status: 401 })))
    });

    userEffects.logout$.subscribe(result => {
      expect(result.type).toEqual(UserActions.USER_LOGOUT_FAIL);
    });
  });

});
