import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../admin.service';
import { AggArticuloDialogComponent } from '../dialogs/agg-articulo-dialog.component';

@Component({
  selector: 'anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.scss']
})
export class AnunciosComponent implements OnInit {

  constructor(private dialog: MatDialog, private adminService: AdminService) { }

  ngOnInit(): void {
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
