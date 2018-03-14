import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadResumeComponent } from './download-resume.component';

describe('DownloadResumeComponent', () => {
  let component: DownloadResumeComponent;
  let fixture: ComponentFixture<DownloadResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
