import { Component, OnInit } from '@angular/core';
import { onSnapshot } from '@angular/fire/firestore';
import { MatChipInputEvent } from '@angular/material/chips';
import { AdminService } from '../admin.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

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

  addOnBlur = true
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

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

  addTag(event: MatChipInputEvent){
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

}
