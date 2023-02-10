import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaArtDialogComponent } from './edita-art-dialog.component';

describe('EditaArtDialogComponent', () => {
  let component: EditaArtDialogComponent;
  let fixture: ComponentFixture<EditaArtDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditaArtDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditaArtDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
