import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-busca-alumno-dialog',
  template: `
    <h1 matDialogTitle>
      Busca un alumno
    </h1>
    <div matDialogContent>
      <mat-form-field appearance="outline">
        <input matInput autocomplete="off" placeholder="216206072"/>
        <button mat-icon-button matSuffix><mat-icon>search</mat-icon></button>
        <mat-label>No. Expediente</mat-label>
      </mat-form-field>
    </div>
    <div matDialogActions>
      <button mat-raised-button [mat-dialog-close]="null">Cerrar</button>
    </div>
  `,
  styles: [
  ]
})
export class BuscaAlumnoDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<BuscaAlumnoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
  }

  ngOnInit(): void {
  }

}
