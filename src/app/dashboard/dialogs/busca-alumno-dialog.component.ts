import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-busca-alumno-dialog',
  template: `
    <h1 matDialogTitle>
      Busca un alumno
    </h1>
    <div matDialogContent>
      <mat-form-field appearance="outline">
        <input 
          (keydown.enter)="buscaAlumno()" 
          matInput autocomplete="off" 
          [(ngModel)]="expediente" 
          placeholder="216206072"
        />

        <button 
          mat-icon-button 
          matSuffix 
          [disabled]="expediente.length != 9"
          (click)="buscaAlumno()"
        >
          <mat-icon>search</mat-icon>
        </button>
        <mat-label>No. Expediente</mat-label>
      </mat-form-field>
      
      <div class="studentInfo" *ngIf="didStudentQuery">
        <div *ngIf="studentExists != undefined && !studentExists">
          <p style="color: rgba(255, 0, 0, 0.699);">* No hay estudiante con ese expediente</p>
        </div>

        <div *ngIf="studentInfo" class="cards">
          <div *ngFor="let prop of studentInfo | keyvalue;" >
            <mat-card 
              [class]="
              prop.key == 'creditedSubjects' || 
              prop.key == 'enrolledSubjects' ? 'hid' : ''"
            >
                {{parseProperty[prop.key]}} : {{prop.value}}  
            </mat-card>

            <mat-card
              *ngIf="
                prop.key == 'creditedSubjects' ||  
                prop.key == 'enrolledSubjects' 
                "
            >
              {{parseProperty[prop.key]}}: 
              <mat-form-field appearance="outline">
                <mat-select>
                  <mat-option
                    *ngFor="let materia of prop.value.split(' ')"
                  >
                    {{materia}}
                  </mat-option>
                </mat-select>
              </mat-form-field>
            </mat-card>

          </div>
        </div>
      </div>

    </div>
    <div matDialogActions>
      <button mat-raised-button [mat-dialog-close]="null">Cerrar</button>
    </div>
  `,
  styles: [`
      .cards{
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .hid{
        display: none;
      }
    `
  ]
})
export class BuscaAlumnoDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<BuscaAlumnoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminService
  ) { 
  }

  expediente = ""

  studentExists: boolean | undefined = undefined

  didStudentQuery: boolean = false

  studentInfo = {}

  parseProperty = {
    "programName": "Nombre programa",
    "programKey": "Clave programa",
    "studyPlan": "Plan",
    "studentID" : "Expediente",
    "name" : "Nombre",
    "studentStatus" : "Status alumno",
    "requiredCredits" : "Creditos pasante",
    "approvedCredits" : "Creditos aprovados",
    "kardexGrade" : "Promedio de kardex",
    "periodGrade" : "Promedio del periodo anterior",
    "approvedSubjects" : "Materias aprobadas",
    "creditedSubjects" : "Materias acreditadas",
    "enrolledSubjects" : "Materias inscritas",
    "secondEnrolledSubjects" : "Materias segunda inscr",
    "thirdEnrolledSubjects" : "Materias tercera inscr",
    "failedSubjects" : "Materias reprobadas",
    "droppedSubjects" : "Materias bajas voluntarias",
    "enrolledCredits" : "Creditos inscritos",
    "levelAndCycleEnglish" : "Nivel y ciclo inglés",
    "email" : "Correo",
    "cultCredits" : "Creditos culturest",
    "sportsCredits" : "Creditos deporte",
    "professionalPracticesStatusAndCycle" : "Practica profesional estatus y ciclo",
    "socialServiceStatusAndCycle" : "serviciosocialmateriaestatus-ciclo",
    "socialServiceProjectStatusAndRegisterCycle" : "estatusproyectoserviciosocial-cicloregistro",
    "egel" : "Egel testimonio",
    "isEnrolled" : "Inscrito",
  }

  buscaAlumno(){
    if(this.expediente.length != 9) return

    this.adminService.buscaAlumno(this.expediente).then(res=>{
      if(res.exists()){
        this.studentInfo = res.data()
        console.log(this.studentInfo)
        this.studentExists = undefined
      }else{
        this.studentExists = false
        this.studentInfo = {}
      }
      return this.didStudentQuery = true
    })
  }

  ngOnInit(): void {
  }

}
