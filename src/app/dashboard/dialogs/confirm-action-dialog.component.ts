import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-action-dialog',
  template: `
    <h1>¿Estas seguro de que quieres {{data.title}}?</h1>
    <div matDialogActions>
      <button mat-stroked-button (click)="onNoClick()">Cerrar</button>
      <button mat-raised-button [mat-dialog-close]="true">{{data.action}}</button>
    </div>
  `,
  styles: [
  ]
})
export class ConfirmActionDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConfirmActionDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close()
  }

}
