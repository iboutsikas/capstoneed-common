import { MockBackend, MockConnection } from '@angular/http/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { ProjectEffects } from '../projects.effects';
import { BaseRequestOptions, ConnectionBackend } from '@angular/http';
import { CustomHttp } from '../../../Services/customHttp';
import { TestBed } from '@angular/core/testing';
import { Project } from '../../Models/project';


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
  })

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

});

