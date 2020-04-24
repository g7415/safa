import { Component, OnInit, Inject } from '@angular/core';
import { TypecongeService } from 'src/app/service/typeconge.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TypeConge } from 'src/app/model/typeconge';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addtypeconge',
  templateUrl: './addtypeconge.component.html',
  styleUrls: ['./addtypeconge.component.scss']
})
export class AddtypecongeComponent implements OnInit {
  signupInfo: TypeConge;
  submitted = false 
  public userFile : any = File 
  constructor(public crudApi: TypecongeService ,private https: HttpClient,
    public fb: FormBuilder,
    public toastr: ToastrService,
    private router : Router,
    @Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<AddtypecongeComponent>,)
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
      id_type: ['', [Validators.required]],
      type_conge:   ['', [Validators.required]], 
      max_permis: ['', [Validators.required]], 
      cong_deja_pris: ['', [Validators.required]],  
      cong_restant:['', [Validators.required]],  
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
    response =>{this.crudApi.listtypecon = response;
    Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Type Congé ajouter avec succes',
    showConfirmButton: false,
    timer: 1500})        
    }
     );
    
     
   
  });
   
}

  updateData()
  {   let data = this.crudApi.dataForm.value;
    console.log(data); 
    // data.roles = [data.roles];
    this.crudApi.updatedata(this.crudApi.dataForm.value.id_type,data)
    .subscribe( data => {
      this.dialogRef.close();
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.listtypecon = response;
          this.toastr.info( 'TypeConge modifier avec Success'); }
       );
      
  
    });
  
   
  }
  
  get id_type(){return this.crudApi.dataForm.get('id_type')}
  get type_conge(){return this.crudApi.dataForm.get('type_conge')}
  get max_permis(){return this.crudApi.dataForm.get('max_permis')}
  get cong_deja_pris(){return this.crudApi.dataForm.get('cong_deja_pris')}
  get cong_restant(){return this.crudApi.dataForm.get('cong_restant')}
 
}
