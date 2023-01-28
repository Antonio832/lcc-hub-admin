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
          *ngFor="let col of data.headers;"
          matColumnDef="header"
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

      .mat-column-programName, .mat-column-programKey, .mat-column-studyPlan, .mat-column-studentID, .mat-column-name, .mat-column-studentStatus, .mat-column-requiredCredits, .mat-column-approvedCredits, .mat-column-kardexGrade, .mat-column-periodGrade, .mat-column-approvedSubjects, .mat-column-creditedSubjects, .mat-column-enrolledSubjects, .mat-column-secondEnrolledSubjects, .mat-column-thirdEnrolledSubjects, .mat-column-failedSubjects, .mat-column-dropedSubjects, .mat-column-enrolledCredits, .mat-column-levelAndCycleEnglish, .mat-column-email, .mat-column-cultCredits, .mat-column-sportsCredits, .mat-column-professionalPracticesStatusAndCycle, .mat-column-socialServiceStatusAndCycle, .mat-column-socialServiceProjectStatusAndRegisterCycle, .mat-column-egel, .mat-column-isEnrolled{
        width: 150px;
      }

      mat-header-cell{
        width: 500px;
      }
    `
  ]
})
export class PreviewCsvComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<PreviewCsvComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
  }

  displayedColumns: string[] = ['header'];

  ngOnInit(): void {
    let formatedHeads = []
    for(let head of this.data.headers){
      formatedHeads.push(`.mat-column-${head}`)
    }
    console.log(formatedHeads.join(', '))
  }

}
