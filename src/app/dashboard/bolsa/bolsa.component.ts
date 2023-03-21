import { Component, OnInit } from '@angular/core';
import { onSnapshot } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../admin.service';
import { AggArticuloDialogComponent } from '../dialogs/agg-articulo-dialog.component';

@Component({
  selector: 'bolsa',
  templateUrl: './bolsa.component.html',
  styleUrls: ['./bolsa.component.scss']
})
export class BolsaComponent implements OnInit {

  constructor(public dialog: MatDialog, private adminService: AdminService) { }

  unsubscribe: any = undefined

  ofertas:any = []
  ngOnInit(): void {
    this.unsubscribe = onSnapshot(this.adminService.getBolsa(), (snap)=>{
      let auxArr: any[] = []
      snap.forEach(doc=>{
        auxArr.push({...doc.data(), docRef: doc.id})
      })
      this.ofertas = auxArr
    })
  }

  aggOferta(){
    const dialogRef = this.dialog.open(AggArticuloDialogComponent,{
      width: '600px',
      data:{
        type: 'Oferta'
      }
    })

    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        if(res){
          this.adminService.aggAnuncioArticulo(res[0], 'bolsa')
        }
      }
    })
  }

}
