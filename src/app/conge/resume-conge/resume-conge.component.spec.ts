import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeCongeComponent } from './resume-conge.component';

describe('ResumeCongeComponent', () => {
  let component: ResumeCongeComponent;
  let fixture: ComponentFixture<ResumeCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
