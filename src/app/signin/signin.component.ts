import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  constructor(_fb:FormBuilder,private router:Router) {let loginFormsControls={
    username: new FormControl("",[Validators.required]),
    password : new FormControl("",[Validators.required])
  }
  this.loginForm=_fb.group(loginFormsControls); }
  get username(){return this.loginForm.get('username')}
  get password(){return this.loginForm.get('password')}
  ngOnInit(): void {
  }
  login(){let data=this.loginForm.value;
    console.log(data)}
    navigateToacceil() {
      this.router.navigate(['listsalarie']);
      console.log("Success Navigation");}
}
