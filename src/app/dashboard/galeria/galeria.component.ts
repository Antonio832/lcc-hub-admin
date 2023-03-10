import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { onSnapshot } from '@angular/fire/firestore';
import { AdminService } from '../admin.service';
import { ImagenGaleriaDialogComponent } from '../dialogs/imagen-galeria-dialog.component';

@Component({
  selector: 'galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss']
})
export class GaleriaComponent implements OnInit {

  constructor(private adminService: AdminService, private dialog: MatDialog) { }

  imgs: any[] = []

  ngOnInit(): void {
    onSnapshot(this.adminService.getImgs(), (snap: any)=>{
      let arrAux: any[] = []

      snap.forEach((doc: any)=>{
        arrAux.push({...doc.data(), docRef: doc.id})
      })

      this.imgs = arrAux
    })
  }

  editImg(docRef: any){
    const prevImgSrc = docRef.url.split('/')[7].split('?')[0]
    const dialogRef = this.dialog.open(ImagenGaleriaDialogComponent)
    console.log(docRef)
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.adminService.aggImgGaleria(res, docRef.date).then(res=>{
          this.adminService.deleteImg(prevImgSrc, docRef.docRef)
        })
      }
    })
  }

  toggleVisible(docRef: string, newVal: boolean){
    this.adminService.updateField('galeria', docRef, 'showInPage', newVal)
  }

  uploadImg(){
    const dialogRef = this.dialog.open(ImagenGaleriaDialogComponent)

    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.adminService.aggImgGaleria(res.imgSrc)
      }
    })
  }
}
