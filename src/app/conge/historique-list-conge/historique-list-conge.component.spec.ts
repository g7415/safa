import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueListCongeComponent } from './historique-list-conge.component';

describe('HistoriqueListCongeComponent', () => {
  let component: HistoriqueListCongeComponent;
  let fixture: ComponentFixture<HistoriqueListCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriqueListCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueListCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
