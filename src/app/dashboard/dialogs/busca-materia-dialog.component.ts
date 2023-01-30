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
    </div>
    <div matDialogActions>
      <button mat-raised-button [mat-dialog-close]="false">Cerrar</button>
    </div>
  `,
  styles: [
  ]
})
export class BuscaMateriaDialogComponent implements OnInit {

  numMateria = ''

  constructor(
    private dialogRef: MatDialogRef<BuscaMateriaDialogComponent>,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
  }

  buscaMateria(){
    this.adminService.buscaMateria(this.numMateria).then(res=>{
      if(res.exists()){
        
      }
    })
  }

}
