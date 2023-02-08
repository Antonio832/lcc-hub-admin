import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../admin.service';
import { EditaPropiedadDialogComponent } from './edita-propiedad-dialog.component';

@Component({
  selector: 'app-busca-materia-dialog',
  template: `
    <h1 matDialogTitle>
      Busca una materia
    </h1>
    <div matDialogContent>
      <mat-form-field appearance="outline">
        <input 
          matInput 
          autocomplete="off" 
          placeholder="0120" 
          maxlength="4"
          [(ngModel)]="numMateria"
          (keydown.enter)="buscaMateria()"
        />
        <mat-label>No. Materia</mat-label>
      </mat-form-field>

      <div class="matInfo" *ngIf="didMatQuery">
        <div *ngIf="matExists != undefined && !matExists">
          <p style="color: rgba(255, 0, 0, 0.699);">* No existe esa materia</p>
        </div>
        
        <div *ngFor="let prop of matInfo | keyvalue;" class="field">
          <mat-card 
            (click)="updateField(parseProperty[prop.key], prop.key)"
          >
            {{parseProperty[prop.key]}}: {{prop.value}}
          </mat-card>
        </div>

      </div>
    </div>
    <div matDialogActions>
      <button mat-raised-button [mat-dialog-close]="false">Cerrar</button>
    </div>
  `,
  styles: [`
      .matInfo{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding-bottom: 1rem;
      }

      .field{
        cursor: pointer;
      }
    `
  ]
})
export class BuscaMateriaDialogComponent implements OnInit {

  numMateria: string = ''

  matExists: boolean | undefined = undefined

  didMatQuery: boolean = false

  matInfo = {}

  parseProperty = {
    "academicDivision":  "División",
    "branch":  "Eje",
    "credits":  "Creditos",
    "department":  "Departamento",
    "labHours":  "HorasLab",
    "requirements":  "Requisito",
    "subjectKey":  "Clave",
    "subjectName":  "Nombre",
    "theoryHours":  "HorasTeoria",
    "workshopHours":  "HorasTaller",
  
  }

  constructor(
    private dialogRef: MatDialogRef<BuscaMateriaDialogComponent>,
    private adminService: AdminService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  buscaMateria(){
    this.adminService.buscaMateria(this.numMateria).then(res=>{
      if(res.exists()){
        this.matInfo = res.data()
        console.log(this.matInfo)
        this.matExists = undefined
      }else{
        this.matExists = false
        this.matInfo = {}
      }
      return this.didMatQuery = true
    })
  }

  updateField(parsedField: string, field: string){
    const dialogRef = this.dialog.open(EditaPropiedadDialogComponent,{
      data:{
        parsedField: parsedField
      }
    })

    dialogRef.afterClosed().subscribe((res)=>{
      if(res){
        console.log(res)
      }
    })
  }

}
