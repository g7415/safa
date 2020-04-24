import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcongeComponent } from './addconge.component';

describe('AddcongeComponent', () => {
  let component: AddcongeComponent;
  let fixture: ComponentFixture<AddcongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
