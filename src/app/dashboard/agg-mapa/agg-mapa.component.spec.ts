import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggMapaComponent } from './agg-mapa.component';

describe('AggMapaComponent', () => {
  let component: AggMapaComponent;
  let fixture: ComponentFixture<AggMapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggMapaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
