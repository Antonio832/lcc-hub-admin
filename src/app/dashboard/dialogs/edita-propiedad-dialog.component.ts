import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edita-propiedad-dialog',
  template: `
    <h1 matDialogTitle>
      Actualiza {{data.parsedField}}
    </h1>
    <div matDialogContent>
      <mat-form-field appearance="outline">
        <input matInput autocomplete="off" [(ngModel)]="newVal" />
      </mat-form-field>
    </div>
    <div matDialogActions>
      <button mat-stroked-button (click)="cierra()">Cerrar</button>
      <button mat-raised-button [disabled]="!newVal" [matDialogClose]="newVal">Actualizar</button>
    </div>
  `,
  styles: [
  ]
})
export class EditaPropiedadDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditaPropiedadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  newVal: any;

  ngOnInit(): void {
  }

  cierra(){
    return this.dialogRef.close()
  }

}
