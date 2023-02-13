import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { initializeApp } from '@firebase/app';
import { doc, setDoc } from '@firebase/firestore';
import { CreateUserDialogComponent } from '../dialogs/create-user-dialog.component';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(public dialog: MatDialog, private auth: Auth, private db: Firestore) { }

  userInfo: any

  ngOnInit(): void {
    this.auth.onAuthStateChanged(res=>{
      if(res){
        this.userInfo = res
      }
    })
  }

  createUser(){
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      data: this.userInfo
    })

    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        const config = {
          apiKey: 'AIzaSyAnnp_BqHnvYzYMVMtgVXhQ8xtoBEOL-5A',
          authDomain: 'lcc-hub.firebaseapp.com',
          databaseURL: 'https://lcc-hub-default-rtdb.firebaseio.com',
        }

        const secondApp = initializeApp(config, "Secundary")
        const secondAuth = getAuth(secondApp)
        createUserWithEmailAndPassword(secondAuth, res.correo, res.password).then(credentials=>{
          if(credentials){
            let powers = []
            if(res.academic){
              powers.push('academic')
            }
            if(res.hub){
              powers.push('hub')
            }
            setDoc(doc(this.db,"users", credentials.user.uid),{
              name: res.nombre,
              academic: res.academic,
              hub: res.hub,
            })
          }
          secondAuth.signOut()
        })
      }
    })
  }

}
