import { Component, NgZone, OnInit } from '@angular/core';
import { Auth, getAuth, signInWithEmailAndPassword} from '@angular/fire/auth'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private auth: Auth, private rtr: Router, private zn: NgZone, public fb: FormBuilder) { }

  loginForm!: FormGroup

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      mail: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      pass: new FormControl('', Validators.required)
    })

    // Cuando cambia el estado del usuario
    this.auth.onAuthStateChanged((user)=>{
      // console.log(user)
      // Si hay usuario o no,
      // si no hay ususario 'user' va a ser null
      if(user){
        this.zn.run(()=>{
          // Navega hacia el dash
          this.rtr.navigate(['/dashboard'])
        })
      }
    })
  }
  
  get mail(){
    return this.loginForm.get('mail')
  }
  
  get pass(){
    return this.loginForm.get('pass')
  }

  login(){
    if(!this.loginForm.valid) return
    // this.loginForm.value.mail
    // 'testingLcc@hotmail.com'
    // 'Betel92'
    signInWithEmailAndPassword(this.auth, this.loginForm.value.mail, this.loginForm.value.pass).then((res)=>{
      console.log(res)
    })
    .catch((error)=>{
      console.log(error.code)
      console.log(error.message)
    })
  }

}
