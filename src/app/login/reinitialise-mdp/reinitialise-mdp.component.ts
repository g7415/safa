import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MustMatch } from 'src/app/salarie/update-password/must-match.validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Salarie } from 'src/app/model/salarie';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { SalarieService } from 'src/app/service/salarie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reinitialise-mdp',
  templateUrl: './reinitialise-mdp.component.html',
  styleUrls: ['./reinitialise-mdp.component.scss']
})
export class ReinitialiseMdpComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  salarie: Salarie;

  constructor(private formBuilder: FormBuilder,private token: TokenStorageService, private router:Router,
    private salarieService: SalarieService) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(5)]],
          password: ['', [Validators.required, Validators.minLength(7)]],
          confirmPassword: ['', Validators.required],
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
this.salarieService.reinitialiseMdp(this.registerForm.value.username,this.registerForm.value)
.subscribe(data=>{this.salarie=data;
  Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Mot de passe modifier',
          showConfirmButton: false,
          timer: 1500
    })
})
this.router.navigate(['/login']);
      console.log("Success Navigation");
  }
}
