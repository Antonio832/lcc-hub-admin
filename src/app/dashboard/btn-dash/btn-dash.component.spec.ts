import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnDashComponent } from './btn-dash.component';

describe('BtnDashComponent', () => {
  let component: BtnDashComponent;
  let fixture: ComponentFixture<BtnDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
