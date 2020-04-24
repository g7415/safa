import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtypecongeComponent } from './addtypeconge.component';

describe('AddtypecongeComponent', () => {
  let component: AddtypecongeComponent;
  let fixture: ComponentFixture<AddtypecongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtypecongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtypecongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
