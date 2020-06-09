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
  error : String;
  conge:Conge[];
  con :any;
  todayDate = new Date();
  SalarieList:Salarie[];
  listtypecon:TypeConge[];
  submitted = false; 
  sal=Salarie;
  public userFile : any = File 
  t: any;
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
      response =>{this.listtypecon = response;
      //   for (var type of response) {
      //     this.t= type.type_conge[0][0];
      //     console.log(this.t);
        
      //  };
      }
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
      salarie:[''], 
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
          }

               }
               
addData() {
  debugger;
  let formvalues = this.crudApi.dataForm.value;
  console.log(formvalues.date_debut);
  console.log(this.crudApi.dataForm.get('typeconge'));
  formvalues.typeconge = { "id_type": formvalues.typeconge };
  formvalues.salarie = {};
  let aa=parseInt(this.token.getId());
  console.log(aa);
  
  // this.salarieService.getData(aa).subscribe(res=>formvalues.salarie.value=res);
  // formvalues.salarie = this.sal ;
  // console.log(formvalues.salarie.value);

  this.crudApi.createData(formvalues,aa)
  .subscribe( data => {
    this.dialogRef.close();
    this.crudApi.getAll()
    .subscribe(
      response =>{this.crudApi.listcon = response;
       Swal.fire({
       position: 'center',
       icon: 'success',
       title: 'Congé ajouté avec succes',
       showConfirmButton: false,
       timer: 1500
})
this.router.navigate(['/historiqueListConge']);
 }
     );
  },err => this.error = err["error"]["message"]
  );
 
  // this.typecongeService.getAll().subscribe(
  //   response =>{this.typecongeService.listtypecon = response;}
  //  );
}

  updateData()
  {
    debugger;
    let formvalues = this.crudApi.dataForm.value;
    formvalues.typeconge = { "id_type": formvalues.typeconge };
    // formvalues.salarie = { "id" : formvalues.salarie }
    formvalues.salarie = {};
    let aa=parseInt(this.token.getId());
    console.log(aa);;
    this.crudApi.updatedata(this.crudApi.dataForm.value.num,aa,formvalues)
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
    },err => this.error = err["error"]["message"]
    );
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
