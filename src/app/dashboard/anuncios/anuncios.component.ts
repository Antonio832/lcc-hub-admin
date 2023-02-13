import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { onSnapshot } from '@firebase/firestore';
import { AdminService } from '../admin.service';
import { AggArticuloDialogComponent } from '../dialogs/agg-articulo-dialog.component';
import { EditaArtDialogComponent } from '../dialogs/edita-art-dialog.component';

@Component({
  selector: 'anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.scss']
})
export class AnunciosComponent implements OnInit {

  constructor(private dialog: MatDialog, private adminService: AdminService) { }

  anuncios: any[] = []

  imgs: any

  ngOnInit(): void {
    onSnapshot(this.adminService.getAnuncios(), (snap)=>{
      let auxArr: any[] = []
      snap.forEach(doc=>{
        auxArr.push({...doc.data(), docRef: doc.id})
      })
      this.anuncios = auxArr
      console.log(this.anuncios[0])
    })
  }

  aggAnuncio(){
    const dialogRef = this.dialog.open(AggArticuloDialogComponent,{
      width: '600px',
      data: {
        type: 'Anuncio'
      }
    })

    dialogRef.afterClosed().subscribe((res)=>{
      if(res){
        this.adminService.aggAnuncioArticulo(res[0], "anuncios")
      }
    })
  }

  editaAnuncio(anuncio: any){
    const dialogRef = this.dialog.open(EditaArtDialogComponent, {
      data: {...anuncio, collection: 'anuncios', type: 'Anuncio'}
    })
  }

}
