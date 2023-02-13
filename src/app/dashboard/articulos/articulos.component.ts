import { Component, OnInit } from '@angular/core';
import { onSnapshot } from '@angular/fire/firestore';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../admin.service';
import { AggArticuloDialogComponent } from '../dialogs/agg-articulo-dialog.component';
import { EditaArtDialogComponent } from '../dialogs/edita-art-dialog.component';

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
        if(res){
          this.adminService.aggAnuncioArticulo(res[0], 'articulos')
        }
      }
    })
  }

  editaArticulo(artic: any){
    const dialogRef = this.dialog.open(EditaArtDialogComponent, {
      data: {...artic, collection: 'articulos', type: 'Articulo'}
    })
  }

}
