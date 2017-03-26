import { CustomHttp } from "../customHttp";
import { Injector, ReflectiveInjector } from "@angular/core";
import { MockBackend, MockConnection } from "@angular/http/testing";
import { inject, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { ConnectionBackend, BaseRequestOptions, Response, Headers, ResponseOptions } from "@angular/http";
import { BASE_URL } from "../../Constants/settings";

describe("Service: CustomHttp", () => {
  var http: CustomHttp;
  var injector: Injector;
  var backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: []
    });
    injector = ReflectiveInjector.resolveAndCreate([
      BaseRequestOptions, MockBackend, {
        provide: CustomHttp,
        useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
          return new CustomHttp(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      }
    ]);
  }); // Before Each

  it("should create the service", () => {
    http = injector.get(CustomHttp);
    backend = injector.get(MockBackend);

    expect(http).toBeTruthy();
    expect(backend).toBeTruthy();
  });

  it('should save the xsrf-token', fakeAsync(() => {
    http = injector.get(CustomHttp);
    backend = injector.get(MockBackend);
    let testUrl = BASE_URL + '/refresh';
    backend.connections.subscribe((c: MockConnection) => {
      expect(c.request.url).toBe(testUrl);
      let headers = new Headers();
      headers.append("xsrf-token", "thisisatesttoken");
      c.mockRespond(new Response(new ResponseOptions({ headers: headers})));
      tick(250);
    });

    http.sendRefreshRequest().subscribe(_ => {});

    expect(http.xsrf_token).toBe("thisisatesttoken");
  }));

  it('should append the xsrf-token correctly', fakeAsync(() => {
    http = injector.get(CustomHttp);
    backend = injector.get(MockBackend);

    http.xsrf_token = "shouldbeappended";

    backend.connections.subscribe((c: MockConnection) => {
      let actualToken = c.request.headers.get('X-XSRF-TOKEN');

      expect(actualToken).toEqual("shouldbeappended");
      tick(250);
    });

    http.get(BASE_URL + '/units').subscribe(_ => {});
  }));

});
