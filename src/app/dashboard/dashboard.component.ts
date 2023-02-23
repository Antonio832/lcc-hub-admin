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
    private rtr: Router, 
    private adminService: AdminService,
  ) { }

  selected = ''

  isAdmin: boolean = false

  ngOnInit() {
  }

  signOut(){
    this.auth.signOut()
  }

  setComponent(component: string){
    return this.selected = component
  }

}
