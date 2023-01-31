import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggArticuloDialogComponent } from './agg-articulo-dialog.component';

describe('AggArticuloDialogComponent', () => {
  let component: AggArticuloDialogComponent;
  let fixture: ComponentFixture<AggArticuloDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggArticuloDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggArticuloDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
