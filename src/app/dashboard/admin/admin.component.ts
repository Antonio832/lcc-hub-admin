import { Component, NgZone, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth } from '@angular/fire/auth';
import { collection, deleteDoc, Firestore, onSnapshot, query } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { initializeApp } from '@firebase/app';
import { doc, setDoc } from '@firebase/firestore';
import { AdminService } from '../admin.service';
import { CreateUserDialogComponent } from '../dialogs/create-user-dialog.component';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    public dialog: MatDialog, 
    private auth: Auth, 
    private db: Firestore, 
    private adminService: AdminService,
    
  ) { }

  userInfo: any

  users: any[] = []

  ngOnInit() {
    this.auth.onAuthStateChanged(async res=>{
      if(res){
        this.userInfo = res

        const isAdmin = await this.adminService.isAdmin(this.userInfo.uid)

        if(!isAdmin){
          this.auth.signOut()
        }

        onSnapshot(query(collection(this.db,"users")),(snap)=>{
          let auxArr: any[] = []
          
          snap.forEach(doc=>{
            auxArr.push({...doc.data(), uid: doc.id})
          })

          this.users = auxArr
          console.log(this.users)
        })
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

  deleteUser(docRef: string){
    return deleteDoc(doc(this.db, "users",docRef))
  }

}
