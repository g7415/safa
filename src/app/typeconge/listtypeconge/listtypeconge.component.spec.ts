import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtypecongeComponent } from './listtypeconge.component';

describe('ListtypecongeComponent', () => {
  let component: ListtypecongeComponent;
  let fixture: ComponentFixture<ListtypecongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListtypecongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListtypecongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
