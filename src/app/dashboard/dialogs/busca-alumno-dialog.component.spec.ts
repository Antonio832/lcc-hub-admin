import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaAlumnoDialogComponent } from './busca-alumno-dialog.component';

describe('BuscaAlumnoDialogComponent', () => {
  let component: BuscaAlumnoDialogComponent;
  let fixture: ComponentFixture<BuscaAlumnoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscaAlumnoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscaAlumnoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
