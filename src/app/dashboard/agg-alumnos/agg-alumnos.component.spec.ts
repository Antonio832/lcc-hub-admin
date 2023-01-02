import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggAlumnosComponent } from './agg-alumnos.component';

describe('AggAlumnosComponent', () => {
  let component: AggAlumnosComponent;
  let fixture: ComponentFixture<AggAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggAlumnosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
