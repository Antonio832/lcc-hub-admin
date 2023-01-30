import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../admin.service';

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
        
        <div *ngFor="let prop of matInfo | keyvalue;">
          <mat-card>{{parseProperty[prop.key]}}: {{prop.value}}</mat-card>
        </div>
      </div>
    </div>
    <div matDialogActions>
      <button mat-raised-button [mat-dialog-close]="false">Cerrar</button>
    </div>
  `,
  styles: [
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
    private adminService: AdminService
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

}
