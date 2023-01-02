import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  opened = false;

  @Output() componentHandler = new EventEmitter<string>()

  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;

  constructor(public afAuth: Auth) { }

  ngOnInit(): void {
  }

  toggleNav(exp?: boolean){
    if(!exp) this.opened = true
    if(exp) this.opened = false
  }

  emmitComponent(componentName: string){
    return this.componentHandler.emit(componentName)
  }

}
