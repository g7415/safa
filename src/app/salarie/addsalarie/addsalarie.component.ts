import { Component, OnInit, Inject } from '@angular/core' 
import {FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms' 
import { ToastrService } from 'ngx-toastr' 
import { SalarieService } from 'src/app/service/salarie.service' 
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { custommail } from './mail.validator';
import { HttpClient } from '@angular/common/http';
import { Salarie } from 'src/app/model/salarie';
@Component({
  selector: 'app-addsalarie',
  templateUrl: './addsalarie.component.html',
  styleUrls: ['./addsalarie.component.scss']
})
export class AddsalarieComponent implements OnInit {
  signupInfo: Salarie;
  submitted = false 
  public userFile : any = File 
  constructor(public crudApi: SalarieService ,private https: HttpClient,
    public fb: FormBuilder,
    public toastr: ToastrService,
    private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<AddsalarieComponent>,)
   {  
   } 

//si on est en mode ajout 
  ngOnInit(){
    if (this.crudApi.choixmenu == 1)
    {this.infoForm()} 
            }
//donc je vais instancié mon formulaire , le vider
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      id: ['', [Validators.required]],
      nom:   ['', [Validators.required]], 
      prenom: ['', [Validators.required]], 
      solde_conge: ['', [Validators.required]],  
      date_entree:['', [Validators.required]],  
      grade: ['', [Validators.required]], 
      mail: ['', [Validators.required, Validators.minLength(7), custommail ]],  
      num_tel:['', [Validators.required]], 
      nom_responsable:  ['', [Validators.required]], 
      groupe:  ['', [Validators.required]], 
      username: ['', [Validators.required]], 
      password: ['', [Validators.required]], 
      roles: ['', [Validators.required]], 
        }) 
    }
  ResetForm() {
      this.crudApi.dataForm.reset() 
              }
  //si je suis en mode ajout je fais adddata sinon updatedata
  // en applelons le web service service/salarie/service/ts eli fih les methodes
  onSubmit() {
    if (this.crudApi.choixmenu == 1)
       this.addData();
    else
      {this.updateData();
       this.crudApi.choixmenu = 1;
      }
             }  
            
  addData() {
      // let data = this.crudApi.dataForm.value;
      // data.role = [data.role];
     
     this.crudApi.createData(this.crudApi.dataForm.value)
  .subscribe( data => {
    this.dialogRef.close();
    this.crudApi.getAll().subscribe(
    response =>{this.crudApi.listsal = response;
    Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Employé ajouter avec succes',
    showConfirmButton: false,
    timer: 1500})        
    }
     );
     this.crudApi.getAllRoles().subscribe(
        response =>{this.crudApi.listrol = response;  
        alert('Email Sent successfully');     
      }
       );
      //  this.crudApi.creatEmail(this.crudApi.dataForm.value)
      //  .subscribe(
      //  res => {
      //    this.crudApi.dataForm.value = res;
      //    console.log(this.crudApi.dataForm.value);
      //    alert('Email Sent successfully');
      //    this.crudApi.dataForm.username = '';
      //    this.crudApi.dataForm.mail = '';
      //  });
   
  });
    // this.https.post<Salarie>('http://localhost:8080/testapp/getdetails', this.crudApi.dataForm.value)
    // .subscribe(
    // res => {
    //   this.crudApi.dataForm.value = res;
    //   console.log(this.crudApi.dataForm.value);
    //   alert('Email Sent successfully');
    //   this.crudApi.dataForm.username = '';
    //   this.crudApi.dataForm.mail = '';
    // });
}

  updateData()
  {   let data = this.crudApi.dataForm.value;
    console.log(data); 
    // data.roles = [data.roles];
    this.crudApi.updatedata(this.crudApi.dataForm.value.id,data)
    .subscribe( data => {
      this.dialogRef.close();
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.listsal = response;
          this.toastr.info( 'Employé modifier avec Success'); }
       );
       this.crudApi.getAllRoles().subscribe(
        response =>{this.crudApi.listrol = response;
          }
       );
      //  this.crudApi.creatEmail(this.crudApi.dataForm.value)
      //  .subscribe(
      //  res => {
      //    this.crudApi.dataForm.value = res;
      //    console.log(this.crudApi.dataForm.value);
      //    alert('Email Sent successfully');
      //    this.crudApi.dataForm.username = '';
      //    this.crudApi.dataForm.mail = '';
      //  });
   
    });
  
   
  }
  get mail(){return this.crudApi.dataForm.get('mail')}
  get password(){return this.crudApi.dataForm.get('password')}
  get groupe(){return this.crudApi.dataForm.get('groupe')}
  get nom(){return this.crudApi.dataForm.get('nom')}
  get prenom(){return this.crudApi.dataForm.get('prenom')}
  get solde_conge(){return this.crudApi.dataForm.get('solde_conge')}
  get date_entree(){return this.crudApi.dataForm.get('date_entree')}
  get grade(){return this.crudApi.dataForm.get('grade')}
  get nom_responsable(){return this.crudApi.dataForm.get('nom_responsable')}
  get num_tel(){return this.crudApi.dataForm.get('num_tel')}
  get username(){return this.crudApi.dataForm.get('username')}
  get roles(){return this.crudApi.dataForm.get('roles')}
}
