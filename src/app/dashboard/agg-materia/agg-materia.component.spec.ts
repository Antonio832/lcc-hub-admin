import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggMateriaComponent } from './agg-materia.component';

describe('AggMateriaComponent', () => {
  let component: AggMateriaComponent;
  let fixture: ComponentFixture<AggMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggMateriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
