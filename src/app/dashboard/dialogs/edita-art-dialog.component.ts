import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '../admin.service';
import { ConfirmActionDialogComponent } from './confirm-action-dialog.component';
import { EditaPropiedadDialogComponent } from './edita-propiedad-dialog.component';

@Component({
  selector: 'app-edita-art-dialog',
  template: `
    <h1 matDialogTitle>Edita el {{data.type}}</h1>
    <div matDialogContent class="cont">
      <mat-card class="prop" (click)="editaProp(data.titulo, 'Titulo', 'titulo')">Titulo: {{data.titulo}}</mat-card>
      <mat-card class="prop" (click)="editaProp(data.desc, 'Descripcion', 'desc')">Descripcion: {{data.desc}}</mat-card>
      <mat-card class="prop" (click)="editaProp(data.link, 'Link', 'link')">Link: {{data.link}}</mat-card>
      <mat-card class="prop" (click)="editaProp(data.tags, 'Tags', 'tags')">Tags: {{data.tags}}</mat-card>
    </div>
    <div matDialogActions>
      <button mat-button [matDialogClose]="">Cerrar</button>
      <button mat-button (click)="deleteElement()" [color]="'warn'">Borrar</button>
    </div>
  `,
  styles: [`
      .cont{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 1rem;
      }

      .prop{
        cursor: pointer;
      }
    `
  ]
})
export class EditaArtDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditaArtDialogComponent>,
    private dialog: MatDialog,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
  }

  editaProp(prop: any, parsedField: string, field: string){
    const dialogRef = this.dialog.open(EditaPropiedadDialogComponent,{
      data: {prop, parsedField}
    })

    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.data[field] = res
        this.adminService.updateField(
          this.data.collection,
          this.data.docRef,
          field,
          res
        )
      }
    })
  }

  deleteElement(){
    const action = this.data.type == 'Articulo' ? 'eliminar el articulo' : 'eliminar el anuncio'
    const dialogRef = this.dialog.open(ConfirmActionDialogComponent,{
      data: {
        title: action,
        action: 'Eliminar'
      }
    })

    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.adminService.deleteDocCol(this.data.collection, this.data.docRef)
        this.dialogRef.close()
      }
    })
  }

}
