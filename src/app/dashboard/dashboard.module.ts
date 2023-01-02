import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatDialogModule } from '@angular/material/dialog'
import { MatTableModule } from '@angular/material/table'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatCardModule } from '@angular/material/card'
import { MatInputModule, } from '@angular/material/input'
import { MatFormFieldModule,  } from '@angular/material/form-field'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavComponent } from './nav/nav.component';
import { DndDirective } from './dnd.directive';
import { AggAlumnosComponent } from './agg-alumnos/agg-alumnos.component';
import { PreviewCsvComponent } from './dialogs/preview-csv.component';
import { AggMateriaComponent } from './agg-materia/agg-materia.component';
import { AggMapaComponent } from './agg-mapa/agg-mapa.component';
import { AnunciosComponent } from './anuncios/anuncios.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { VideosComponent } from './videos/videos.component';


@NgModule({
  declarations: [DashboardComponent, NavComponent, DndDirective, AggAlumnosComponent, PreviewCsvComponent, AggMateriaComponent, AggMapaComponent, AnunciosComponent, ArticulosComponent, VideosComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatExpansionModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
