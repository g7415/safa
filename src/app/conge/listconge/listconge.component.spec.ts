import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcongeComponent } from './listconge.component';

describe('ListcongeComponent', () => {
  let component: ListcongeComponent;
  let fixture: ComponentFixture<ListcongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListcongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
