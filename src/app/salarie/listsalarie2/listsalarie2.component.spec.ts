import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Listsalarie2Component } from './listsalarie2.component';

describe('Listsalarie2Component', () => {
  let component: Listsalarie2Component;
  let fixture: ComponentFixture<Listsalarie2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Listsalarie2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Listsalarie2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
