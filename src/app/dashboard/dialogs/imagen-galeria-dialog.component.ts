import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-imagen-galeria-dialog',
  template: `
    <h1 matDialogTitle>Sube una imagen</h1>
    <div matDialogContent>
      <mat-form-field appearance="outline">
        <mat-label>Titulo</mat-label>
        <input type="text" matInput [(ngModel)]="titulo"/>
      </mat-form-field>
      <button mat-raised-button (click)="file.click()">
        <mat-icon>file_download</mat-icon>
        Agregar una imagen
      </button>
      <input 
        type="file"
        #file
        [multiple]="false"
        (change)="onFileChange($event)"
        style="display:none; width: 100%; height: 100%;" 
      />
    </div>
    <div matDialogActions>
      <button mat-button (click)="onNoClick()">Cerrar</button>
      <button 
        mat-raised-button 
        [matDialogClose]="{imgSrc,titulo}"
        [disabled]="!titulo || !imgSrc"
      >
        Subir
      </button>
    </div>
  `,
  styles: [
  ]
})
export class ImagenGaleriaDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ImagenGaleriaDialogComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close()
  }

  titulo: string = ""

  imgSrc: any
  gotImg: boolean = false

  onFileChange(files:any){
    this.imgSrc = files.target.files[0]
    if(this.imgSrc.type == "image/jpg" || 
      this.imgSrc.type == "image/png" || 
      this.imgSrc.type == "image/jpeg"
    ){
      this.gotImg = true
    }else{
      this.imgSrc = ""
    }
  }

}
