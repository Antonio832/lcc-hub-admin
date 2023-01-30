import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaMateriaDialogComponent } from './busca-materia-dialog.component';

describe('BuscaMateriaDialogComponent', () => {
  let component: BuscaMateriaDialogComponent;
  let fixture: ComponentFixture<BuscaMateriaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscaMateriaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscaMateriaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
