import { Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Output() componentHandler = new EventEmitter<string>()

  isAdmin: boolean = false

  constructor(public auth: Auth, private adminService: AdminService, private rtr: Router,
    private zn: NgZone, 
    ) { }

  isAcademic: boolean = false
  isHub: boolean = false

  userInfo: any

  ngOnInit(): void {
    this.auth.onAuthStateChanged(async (user)=>{
      // Si hay usuario o no,
      // si no hay ususario 'user' va a ser null
      if(!user){
        this.zn.run(()=>{
          // Navega hacia el inicio
          return this.rtr.navigate(['/'])
        })
      }else{
        this.adminService.getUserProfile(user.uid).then(res=>{
          this.userInfo = res
        })
        this.isAdmin = await this.adminService.isAdmin(user.uid)
        console.log(user)
      }
    })
    
  }


  emmitComponent(componentName: string){
    return this.componentHandler.emit(componentName)
  }

}
