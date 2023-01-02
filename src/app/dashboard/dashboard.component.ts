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

  selected = 'materias'

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user)=>{
      // Si hay usuario o no,
      // si no hay ususario 'user' va a ser null
      if(!user){
        this.zn.run(()=>{
          // Navega hacia el inicio
          this.rtr.navigate(['/'])
        })
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
