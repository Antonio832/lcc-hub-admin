import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-preview-csv',
  template: `
    <div matDialogTitle>
      Estas por agregar la tabla {{data.subject}}
    </div>
    <div matDialogContent>
      <table mat-table [dataSource]="data.tabla" >

        <ng-container
          *ngFor="let col of data.headers"
          [matColumnDef]="col"
        >
          <th mat-header-cell *matHeaderCellDef> {{col}} </th>
          <td mat-cell *matCellDef="let elemn"> {{elemn[col]}} </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="data.headers"></tr>
        <tr mat-row *matRowDef="let row; columns: data.headers;"></tr>

      </table>
    </div>
    <div matDialogActions class="actions">
      <button mat-stroked-button [mat-dialog-close]="false">Cancelar</button>
      <button mat-raised-button color="accent" [mat-dialog-close]="true">Agregar</button>
    </div>
  `,
  styles: [`
      .actions{
        display: flex;
        flex-direction: row;
        align-items: center;
        :nth-child(1){
          margin-left: auto;
        }
        :nth-child(2){
          margin-right: auto;
        }
      }
    `
  ]
})
export class PreviewCsvComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<PreviewCsvComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    console.log(data)
  }

  ngOnInit(): void {
  }

}
