import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss']
})
export class GaleriaComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  imgSrc: any;

  ngOnInit(): void {
  }

  onFileChange(files:any, ref: any){
    this.imgSrc = files.target.files[0]
    console.log(this.imgSrc)
    if(this.imgSrc.type == "image/jpg" || 
      this.imgSrc.type == "image/png" || 
      this.imgSrc.type == "image/jpeg"
    ){
      this.adminService.aggImgGaleria(this.imgSrc)
      this.imgSrc = ""
    }else{
      this.imgSrc = ""
    }
  }

}
