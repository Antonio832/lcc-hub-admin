import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenGaleriaDialogComponent } from './imagen-galeria-dialog.component';

describe('ImagenGaleriaDialogComponent', () => {
  let component: ImagenGaleriaDialogComponent;
  let fixture: ComponentFixture<ImagenGaleriaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagenGaleriaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagenGaleriaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
