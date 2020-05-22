import { Component, OnInit, Inject } from '@angular/core' 
import {FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms' 
import { ToastrService } from 'ngx-toastr' 
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { CongeService } from 'src/app/service/conge.service';
import { Conge } from 'src/app/model/conge';
import { SalarieService } from 'src/app/service/salarie.service';
import { Salarie } from 'src/app/model/salarie';
import Swal from 'sweetalert2';
import { TypeConge } from 'src/app/model/typeconge';
import { TypecongeService } from 'src/app/service/typeconge.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
@Component({
  selector: 'app-addconge',
  templateUrl: './addconge.component.html',
  styleUrls: ['./addconge.component.scss']
})
export class AddcongeComponent implements OnInit {
  conge:Conge[];
  con :any;
  todayDate = new Date();
  SalarieList:Salarie[];
  listtypecon:TypeConge[];
  submitted = false 
  public userFile : any = File 
  constructor(public crudApi: CongeService ,public fb: FormBuilder,public toastr: ToastrService,private token: TokenStorageService,
  private router : Router, public salarieService: SalarieService,public typecongeService:TypecongeService,
  @Inject(MAT_DIALOG_DATA)  public data,
  public dialogRef:MatDialogRef<AddcongeComponent>,) { }
  get num(){return this.crudApi.dataForm.get('num')}
  get date_debut(){return this.crudApi.dataForm.get('date_debut')}
  get date_fin(){return this.crudApi.dataForm.get('date_fin')}
  get statut(){return this.crudApi.dataForm.get('statut')}
  get typeconge(){return this.crudApi.dataForm.get('typeconge')}
  get salarie(){return this.crudApi.dataForm.get('salarie')}
  // get idsal(){return this.crudApi.dataForm.get('idsal')}
  // get id_type(){return this.crudApi.dataForm.get('id_type')}
  
  ngOnInit() {
   
    if (this.crudApi.choixmenu == 1)
    {this.infoForm()};
    this.salarieService.getAll().subscribe(
      response =>{this.SalarieList = response;}
     );
     this.typecongeService.getAll().subscribe(
      response =>{this.listtypecon = response;}
     );
    
  }

  viderFormulaire(){
    this.crudApi.choixmenu = 1
  }
  
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      num: [''],
      date_debut: ['', [Validators.required]], 
      date_fin: ['', [Validators.required]],
      duree: ['', [Validators.required]],   
      statut:['en attente', [Validators.required]],  
      typeconge:['', [Validators.required]],  
      salarie:['', [Validators.required]], 
      // idsal:['', [Validators.required]], 
      // id_type:['', [Validators.required]], 
        }) 
    }
    
    ResetForm() {
      this.crudApi.dataForm.reset() 
  }
    onSubmit() {
    if (this.crudApi.choixmenu == 1)
    {this.addData();}   
         else
         {
           this.updateData();
           this.crudApi.choixmenu = 1;
          }

               }
addData() {
  debugger;
  let formvalues = this.crudApi.dataForm.value;
  formvalues.typeconge = { "id_type": formvalues.typeconge };
  // formvalues.salarie = { "solde_conge": formvalues.solde_conge };
  formvalues.salarie = { "id" : formvalues.salarie };
  this.crudApi.createData(formvalues)
  .subscribe( data => {
    this.dialogRef.close();
    this.crudApi.getAll()
    .subscribe(
      response =>{this.crudApi.listcon = response;
       Swal.fire({
       position: 'top-end',
       icon: 'success',
       title: 'Congé ajouté avec succes',
       showConfirmButton: false,
       timer: 1500
}) }
     );
    this.router.navigate(['/historiqueListConge']);
  });
  // this.typecongeService.getAll().subscribe(
  //   response =>{this.typecongeService.listtypecon = response;}
  //  );
}

  updateData()
  {
    debugger;
    let formvalues = this.crudApi.dataForm.value;
    formvalues.typeconge = { "id_type": formvalues.typeconge };
    formvalues.salarie = { "id" : formvalues.salarie };
    this.crudApi.updatedata(this.crudApi.dataForm.value.num,this.crudApi.dataForm.value)
    .subscribe( data => {
      this.dialogRef.close();
      this.crudApi.getAll()
      .subscribe(
        response =>{this.crudApi.listcon = response;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Congé modifié avec succes',
            showConfirmButton: false,
            timer: 1500
     })
        }
       );
      this.router.navigate(['/historiqueListConge']);
    });
    // this.typecongeService.getAll().subscribe(
    //   response =>{this.typecongeService.listtypecon = response;}
    //  );
    
  }
  navigateToListConge(){
    this.router.navigate(['/listconge']);
    console.log("Success Navigation");
  }
   dateDiff()
   {
    let date_debut = new Date(this.crudApi.dataForm.value.date_debut);
    let date_fin = new Date(this.crudApi.dataForm.value.date_fin);
    this.crudApi.dataForm.patchValue({
      duree:  new Number((date_fin.getTime()  - date_debut.getTime())/ 86400000).toFixed(0)
    });
     
   }
}
