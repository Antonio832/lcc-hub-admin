import { Component, NgZone, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private auth: Auth, 
    private zn: NgZone, 
    private rtr: Router, 
    private adminService: AdminService
  ) { }

  selected = 'alumnos'

  isAdmin: boolean = false

 ngOnInit() {
    this.auth.onAuthStateChanged(async (user)=>{
      // Si hay usuario o no,
      // si no hay ususario 'user' va a ser null
      if(!user){
        this.zn.run(()=>{
          // Navega hacia el inicio
          return this.rtr.navigate(['/'])
        })
      }else{
        this.adminService.getUserProfile(user.uid)
        this.isAdmin = await this.adminService.isAdmin(user.uid)
        console.log(user)
      }
    })
  }

  signOut(){
    this.auth.signOut()
  }

  setComponent(component: string){
    return this.selected = component
  }

}
