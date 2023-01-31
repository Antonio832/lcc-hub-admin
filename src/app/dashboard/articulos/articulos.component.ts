import { Component, OnInit } from '@angular/core';
import { onSnapshot } from '@angular/fire/firestore';
import { AdminService } from '../admin.service';

@Component({
  selector: 'articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss']
})
export class ArticulosComponent implements OnInit {

  titulo: string = ''
  desc: string = ''
  link: string = ''
  tagHolder: string = ''
  tags: string[] = []

  articulos: any[] = []

  constructor(private adminService: AdminService) { }

  unsubscribe: any = undefined

  ngOnInit(): void {
    this.unsubscribe = onSnapshot(this.adminService.getArticulos(), (snap)=>{
      let auxArr: any[] = []
      snap.forEach(doc=>{
        auxArr.push(doc.data())
      })
      this.articulos = auxArr
    })
  }

  aggArticulo(){
    if(!this.link) return 

    let givenURL
    
    try {
        givenURL = new URL (this.link);
    } catch (error) {
        console.log ("error is", error);
        this.link = ''
       return console.log('no fue un URL valido'); 
    }

    this.adminService.aggArticulo({url: this.link, date: new Date()})

    return this.link = ''
  }

  addTag(){
    if(!this.tagHolder) return

    this.tags.push(this.tagHolder)
    this.tagHolder = ''
  }

}
