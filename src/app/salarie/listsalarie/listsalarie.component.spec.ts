import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsalarieComponent } from './listsalarie.component';

describe('ListsalarieComponent', () => {
  let component: ListsalarieComponent;
  let fixture: ComponentFixture<ListsalarieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsalarieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsalarieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
