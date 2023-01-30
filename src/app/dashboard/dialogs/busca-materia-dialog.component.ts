import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-busca-materia-dialog',
  template: `
    <h1 matDialogTitle>
      Busca una materia
    </h1>
    <div matDialogContent>
      <mat-form-field>
        <input matInput autocomplete="off" />
        <mat-label></mat-label>
      </mat-form-field>
    </div>
    <div matDialogActions>
      <button mat-raised-button>Cerrar</button>
    </div>
  `,
  styles: [
  ]
})
export class BuscaMateriaDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
