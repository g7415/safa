import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsalarieComponent } from './addsalarie.component';

describe('AddsalarieComponent', () => {
  let component: AddsalarieComponent;
  let fixture: ComponentFixture<AddsalarieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsalarieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsalarieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
