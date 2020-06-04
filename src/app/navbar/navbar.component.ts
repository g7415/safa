import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private roles: string[];
  authority: string;
  info: any;
 constructor(private tokenStorage: TokenStorageService) { }
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
