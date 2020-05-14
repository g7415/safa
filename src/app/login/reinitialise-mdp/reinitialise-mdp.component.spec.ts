import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinitialiseMdpComponent } from './reinitialise-mdp.component';

describe('ReinitialiseMdpComponent', () => {
  let component: ReinitialiseMdpComponent;
  let fixture: ComponentFixture<ReinitialiseMdpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReinitialiseMdpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReinitialiseMdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
