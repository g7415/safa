import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from './must-match.validator';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { SalarieService } from 'src/app/service/salarie.service';
import { Salarie } from 'src/app/model/salarie';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  salarie: Salarie;

  constructor(private formBuilder: FormBuilder,private token: TokenStorageService,private salarieService: SalarieService) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          password: ['', [Validators.required, Validators.minLength(7)]],
          confirmPassword: ['', Validators.required],
          acceptTerms: [false, Validators.requiredTrue]
      }, {
          validator: MustMatch('password', 'confirmPassword')
      });
     let username=this.token.getUsername();
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
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }

  updatePassword(){
this.salarieService.updatePassword(this.token.getUsername(),this.registerForm.value)
.subscribe(data=>{this.salarie=data;
  Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Mot de passe modifier',
          showConfirmButton: false,
          timer: 1500
    })
})
  }
}
