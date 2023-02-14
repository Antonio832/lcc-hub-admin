import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-user-dialog',
  template: `
    <h1 matDialogTitle>Crea un Usuario</h1>
    <div matDialogContent class="cont">
      <div class="left">
        <mat-form-field appearance="outline">
          <mat-label>Nombre</mat-label>
          <input 
            matInput
            autocomplete="off"
            [(ngModel)]="nombre"
          />
        </mat-form-field>
  
        <mat-form-field appearance="outline">
          <mat-label>Correo</mat-label>
          <input 
            matInput
            autocomplete="off"
            [(ngModel)]="correo"
          />
        </mat-form-field>
  
        <mat-form-field appearance="outline">
          <mat-label>Password</mat-label>
          <input 
            matInput
            autocomplete="off"
            [(ngModel)]="password"
          />
        </mat-form-field>
      </div>
      <div class="right">
        <mat-checkbox [(ngModel)]="academic">Editor academico</mat-checkbox>
        <mat-checkbox [(ngModel)]="hub">Editor Hub</mat-checkbox>
      </div>
    </div>
    <div matDialogActions>
      <button mat-button (click)="onNoClick()">Cancelar</button>
      <button 
        mat-raised-button 
        [disabled]="!academic && !hub" 
        [matDialogClose]="{nombre,correo,password,academic,hub}"
      >
        Crear Usuario
      </button>
    </div>
  `,
  styles: [`
      .cont{
        display: flex;
        gap: 1rem;
      }
      .left, .right{
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .right{
        justify-content: center;
      }

    `
  ]
})
export class CreateUserDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<CreateUserDialogComponent>
  ) { }

  nombre: string = ''
  correo: string = ''
  password: string = ''
  academic: boolean = false
  hub: boolean = false

  onNoClick(){
    this.dialogRef.close()
  }

  ngOnInit(): void {
  }

}
