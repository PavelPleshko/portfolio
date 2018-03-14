import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintSlideComponent } from './print-slide.component';

describe('PrintSlideComponent', () => {
  let component: PrintSlideComponent;
  let fixture: ComponentFixture<PrintSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
