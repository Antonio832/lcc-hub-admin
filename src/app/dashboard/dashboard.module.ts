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
import { MatTooltipModule } from '@angular/material/tooltip'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatSelectModule } from '@angular/material/select'
import { MatChipsModule } from '@angular/material/chips'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatRippleModule } from '@angular/material/core'

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavComponent } from './nav/nav.component';
import { AggAlumnosComponent } from './agg-alumnos/agg-alumnos.component';
import { PreviewCsvComponent } from './dialogs/preview-csv.component';
import { AggMateriaComponent } from './agg-materia/agg-materia.component';
import { AggMapaComponent } from './agg-mapa/agg-mapa.component';
import { AnunciosComponent } from './anuncios/anuncios.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { VideosComponent } from './videos/videos.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { AdminComponent } from './admin/admin.component';
import { BuscaAlumnoDialogComponent } from './dialogs/busca-alumno-dialog.component';
import { BuscaMateriaDialogComponent } from './dialogs/busca-materia-dialog.component';
import { EditaPropiedadDialogComponent } from './dialogs/edita-propiedad-dialog.component';
import { AggArticuloDialogComponent } from './dialogs/agg-articulo-dialog.component';
import { StorageModule } from '@angular/fire/storage';
import { EditaArtDialogComponent } from './dialogs/edita-art-dialog.component';
import { ConfirmActionDialogComponent } from './dialogs/confirm-action-dialog.component';
import { CreateUserDialogComponent } from './dialogs/create-user-dialog.component';
import { ImagenGaleriaDialogComponent } from './dialogs/imagen-galeria-dialog.component';
import { BtnDashComponent } from './btn-dash/btn-dash.component';


@NgModule({
  declarations: [DashboardComponent, NavComponent, AggAlumnosComponent, PreviewCsvComponent, AggMateriaComponent, AggMapaComponent, AnunciosComponent, ArticulosComponent, VideosComponent, GaleriaComponent, AdminComponent, BuscaAlumnoDialogComponent, BuscaMateriaDialogComponent, EditaPropiedadDialogComponent, AggArticuloDialogComponent, EditaArtDialogComponent, ConfirmActionDialogComponent, CreateUserDialogComponent, ImagenGaleriaDialogComponent, BtnDashComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatExpansionModule,
    MatChipsModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRippleModule,
    FormsModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    DashboardRoutingModule,
    StorageModule
  ]
})
export class DashboardModule { }
