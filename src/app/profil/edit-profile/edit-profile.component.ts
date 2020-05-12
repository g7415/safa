import { Component, OnInit } from '@angular/core';
import { Salarie } from 'src/app/model/salarie';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SalarieService } from 'src/app/service/salarie.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  sala: any;
  editForm: FormGroup;
  toastr: any;
  errorMessage: string;
  info: {};
  constructor(private formBuilder: FormBuilder,private router: Router,
     private salarieService: SalarieService,private token: TokenStorageService,) { }

  ngOnInit() {
  let userId = this.token.getId();
  this.salarieService.getData(parseInt(userId)).subscribe(
  data => {this.sala=data,
    this.token.saveId(data.id);
    this.token.saveNom(data.nom);
    console.log(this.token.getNom());
    console.log(this.token.getId());

    
  console.log(this.sala);},
  error=>console.log(error)
    );
    this.info = { id:this.token.getId(),
      nom:this.token.getNom()}
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['profil']);
      return;
      
    }
   

    this.editForm = this.formBuilder.group({
      id: [''],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      mail: ['', Validators.required],
      age: ['', Validators.required],
      num_tel: ['', Validators.required],
      username: ['', Validators.required],
      grade: ['', Validators.required],
      groupe: ['', Validators.required]
    });
    // this.salarieService.getData(+userId)
    //   .subscribe( data => {
    //     this.editForm.setValue(data.result);
    //   });
  }
 
  onSubmit() {
    this.salarieService.updatedata(parseInt(this.token.getId()), this.editForm.value)
     .subscribe(
     response =>{this.salarieService.listsal 
     this.toastr.info( 'Employé modifier avec Success');
     } 
     );
      error => {this.errorMessage ='Please verify the informations in the form.', 
                console.error(error)}
     debugger;
    
     
     }

}
