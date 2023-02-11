import { Component, OnInit } from '@angular/core';
import { onSnapshot } from '@angular/fire/firestore';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../admin.service';
import { AggArticuloDialogComponent } from '../dialogs/agg-articulo-dialog.component';

@Component({
  selector: 'articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss']
})
export class ArticulosComponent implements OnInit {

  articulos: any[] = []

  constructor(private adminService: AdminService, public dialog: MatDialog) { }

  unsubscribe: any = undefined

  img: any

  ngOnInit(): void {
    this.unsubscribe = onSnapshot(this.adminService.getArticulos(), (snap)=>{
      let auxArr: any[] = []
      snap.forEach(doc=>{
        auxArr.push({...doc.data(), docRef: doc.id})
      })
      this.articulos = auxArr
    })
  }

  aggArticulo(){
    const dialogRef = this.dialog.open(AggArticuloDialogComponent,{
      width: '600px',
      data:{
        type: 'Articulo'
      }
    })

    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        const articData = res[0]
        console.log(articData)
        this.adminService.uploadPhoto(articData.imgSrc)
        
      }
    })
  }

  editaArticulo(artic: any){

  }

  deleteArtic(artId: any){
    return this.adminService.deleteArticulo(artId)
  }

}
