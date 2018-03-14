import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSingleModalComponent } from './project-single-modal.component';

describe('ProjectSingleModalComponent', () => {
  let component: ProjectSingleModalComponent;
  let fixture: ComponentFixture<ProjectSingleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSingleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSingleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
