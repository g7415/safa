import { Component, OnInit } from '@angular/core';
import { SalarieService } from 'src/app/service/salarie.service';
import { Salarie } from 'src/app/model/salarie';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/salarie/update-password/must-match.validator';
import { custommail } from 'src/app/salarie/addsalarie/mail.validator';

@Component({
  selector: 'app-reset-password-email',
  templateUrl: './reset-password-email.component.html',
  styleUrls: ['./reset-password-email.component.scss']
})
export class ResetPasswordEmailComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  salarie: Salarie;

  constructor(private formBuilder: FormBuilder,private token: TokenStorageService, private router:Router,
    private salarieService: SalarieService) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
        
        mail: ['', [Validators.required, Validators.minLength(7), custommail ]],  
      
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      // display form values on success
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null,2));
      this.router.navigate(['/auth/login']);
      console.log("Success Navigation");
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
    
  }

congeAccepter(){ 
  this.salarieService.EmailresetPassword1(this.registerForm.value)
  .subscribe(data =>{this.salarie = data;
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Email Envoyer',
      showConfirmButton: false,
      timer: 1500
              })
  })
 
  
}

}














