import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { onSnapshot } from '@firebase/firestore';
import { AdminService } from '../admin.service';
import { AggArticuloDialogComponent } from '../dialogs/agg-articulo-dialog.component';

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
        this.adminService.aggAnuncio(res[0])
      }
    })
  }

}
