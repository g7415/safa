import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcongeByManagerComponent } from './listconge-by-manager.component';

describe('ListcongeByManagerComponent', () => {
  let component: ListcongeByManagerComponent;
  let fixture: ComponentFixture<ListcongeByManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListcongeByManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcongeByManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
