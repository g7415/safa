import { Component, OnInit } from '@angular/core';
import { Salarie } from 'src/app/model/salarie';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SalarieService } from 'src/app/service/salarie.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  sala: any;
  editForm: FormGroup;
  toastr: any;
  errorMessage: string;
  constructor(private formBuilder: FormBuilder,private router: Router,
    private salarieService: SalarieService,private token: TokenStorageService,) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          id: [''],
          nom: ['', [ Validators.required, Validators.minLength(3)]],
          prenom: ['', [Validators.required, Validators.minLength(3)]],
          mail: ['', [Validators.required ,Validators.email]],
          num_tel: ['', [Validators.required, Validators.minLength(8)]],
      
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
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
  updateProfil(){
    this.salarieService.updateProfil(parseInt(this.token.getId()),this.registerForm.value)
    .subscribe(data=>{this.sala=data;
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


 