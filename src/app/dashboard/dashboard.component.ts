import { Component, NgZone, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private auth: Auth, private zn: NgZone, private rtr: Router) { }

  selected = 'videos'

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user)=>{
      // Si hay usuario o no,
      // si no hay ususario 'user' va a ser null
      if(!user){
        this.zn.run(()=>{
          // Navega hacia el inicio
          return this.rtr.navigate(['/'])
        })
      }else{
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
