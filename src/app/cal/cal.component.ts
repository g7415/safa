import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';


@Component({
  selector: 'app-cal',
  templateUrl: './cal.component.html',
  styleUrls: ['./cal.component.scss']
})
export class CalComponent implements OnInit {


loginForm: FormGroup;

constructor(_fb:FormBuilder,private router:Router,private tokenStorage: TokenStorageService) {
  $(document).ready(function(){
    $(".push_menu").click(function(){
         $(".wrapper").toggleClass("active");
    });
});
  let loginFormsControls={
  username: new FormControl("",[Validators.required]),
  password : new FormControl("",[Validators.required])
}
this.loginForm=_fb.group(loginFormsControls); }
get username(){return this.loginForm.get('username')}
get password(){return this.loginForm.get('password')}

login(){let data=this.loginForm.value;
  console.log(data)}
  navigateToacceil() {
    this.router.navigate(['listsalarie']);
    console.log("Success Navigation");}
    

    private roles: string[];
    authority: string;
    info: any;
   ngOnInit() {
     if (this.tokenStorage.getToken()) {
       this.roles = this.tokenStorage.getAuthorities();
       this.roles.every(role => {
         if (role === 'ROLE_MANAGER') {
           this.authority = 'manager';
           return false;
         } else if (role === 'ROLE_RH') {
           this.authority = 'rh';
           return false;
         }
         this.authority = 'user';
         return true;
       });
     }
     this.info = {
       token: this.tokenStorage.getToken(),
       username: this.tokenStorage.getUsername(),
       authorities: this.tokenStorage.getAuthorities()
     };
     
   }
   logout() {
     this.tokenStorage.signOut();
     window.location.reload();
   }
  }
  
