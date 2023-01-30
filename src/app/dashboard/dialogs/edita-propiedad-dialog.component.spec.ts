import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaPropiedadDialogComponent } from './edita-propiedad-dialog.component';

describe('EditaPropiedadDialogComponent', () => {
  let component: EditaPropiedadDialogComponent;
  let fixture: ComponentFixture<EditaPropiedadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditaPropiedadDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditaPropiedadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
