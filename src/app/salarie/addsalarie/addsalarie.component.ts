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
  errorMessage = '';
  userUpdated;
  userCreated;
  SalarieList:Salarie[];
  signupInfo: Salarie;
  salarie:Salarie;
  managerList:Salarie[];
  userFile ;
  public imagePath;
  imgURL: any;
  public message: string;
  submitted = false 
   //upload image info
   public selectedFile;
   public event1;
   receivedImageData :any;
   base64Data: any;
   convertedImage: any;
   imageName : any;
   retrievedImage : any;
   retrieveResonse: any;
   pictureData:any;
   pic:any;
  
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

    if (this.crudApi.choixmenu == 1){
      this.infoForm()
    }
   
    this.crudApi.getAll().subscribe(
      response =>{this.SalarieList = response;}
     );
    
      this.crudApi.getAllManager().subscribe(
        response =>{this.managerList = response;} );
    
}

//donc je vais instancié mon formulaire , le vider
infoForm() {
    this.crudApi.dataForm = this.fb.group({
      id: [''],
      nom:   ['', [Validators.required, Validators.minLength(3)]], 
      prenom: ['', [Validators.required, Validators.minLength(3)]], 
      solde_conge: ['', [Validators.required]],  
      date_entree:['', [Validators.required]],  
      grade: ['', [Validators.required, Validators.minLength(3)]], 
      mail: ['', [Validators.required, Validators.minLength(7), custommail ]],  
      num_tel:['', [Validators.required,Validators.minLength(8)]], 
      nom_responsable:  ['', [Validators.required, Validators.minLength(3)]], 
      groupe:  ['', [Validators.required, Validators.minLength(3)]], 
      username: ['', [Validators.required]], 
      password: ['', [Validators.required, Validators.minLength(8)]], 
      roles: ['', [Validators.required]], 
      manager: [''], 
      pic :['']
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
      {
        this.updateData();
        
      }
  }  

  viderFormulaire(){
    this.crudApi.choixmenu = 1
  }
   
  
  
addData() {
 
// btoa Méthode permettant de créer une chaîne ASCII en base64 à partir d'une « chaîne » de données binaires.
//  atob Méthode permettant de décoder une chaîne de donnée qui a été encodée en base64.
    this.crudApi.dataForm.value.pic =  btoa(this.receivedImageData.pic)
    let formvalues = this.crudApi.dataForm.value;
    // formvalues.manager= [formvalues.manager];
    // console.log(formvalues);
    this.crudApi.createData(formvalues)
    .subscribe(user => { 
      debugger;
    this.userCreated = user;
    this.dialogRef.close();
    this.crudApi.getAll()
    .subscribe(
    response =>{this.crudApi.listsal = this.formatRole(response);
      // this.crudApi.listsal = this.formatManager(response);
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
    }
    );
    let aaa =this.crudApi.dataForm.value
    this.userCreated.password=aaa.password;
    this.crudApi.creatEmail(this.userCreated)
    .subscribe(
     res => {
     this.salarie = res;
     console.log(this.salarie);
     alert('Email Sent successfully');
     this.crudApi.dataForm.username = '';
     this.crudApi.dataForm.mail = '';
     });
   
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
debugger;
updateData() {
  // btoa Méthode permettant de créer une chaîne ASCII en base64 à partir d'une « chaîne » de données binaires.
//  atob Méthode permettant de décoder une chaîne de donnée qui a été encodée en base64.
  this.crudApi.dataForm.value.pic =  btoa(this.receivedImageData.pic);
  let data = this.crudApi.dataForm.value;
  console.log(data); 
  // data.roles = [data.roles];
  this.crudApi.updatedata(this.crudApi.dataForm.value.id,data)
  .subscribe( user => {  
  this.userUpdated = user;
   this.dialogRef.close();
   this.crudApi.getAll()
   .subscribe(
   response =>{this.crudApi.listsal = this.formatRole(response);
   this.toastr.info( 'Employé modifier avec Success');
   }
   );
   this.crudApi.getAllRoles().subscribe(
   response =>{this.crudApi.listrol = response;
   }

   );
  //  debugger;
  //  this.crudApi.creatEmail(this.userUpdated)

  
  let aaa =this.crudApi.dataForm.value
    this.userUpdated.password=aaa.password;
    this.crudApi.creatEmail(this.userUpdated)
   .subscribe(
    res => {
    this.crudApi.dataForm.value = res;
    console.log(this.crudApi.dataForm.value);
    alert('Email Sent successfully');
    this.crudApi.dataForm.username = '';
    this.crudApi.dataForm.mail = '';
    });
    } ,
    error => {this.errorMessage ='Please verify the informations in the form.', 
              console.error(error)}
    );
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
  get manager(){return this.crudApi.dataForm.get('manager')}

  formatRole(reponse : any){
    for (var salarie of reponse) {
      let tabRole = Array();
      let tabTabRole = Array();
      let i = 0;
      for(var role of salarie.roles){
        tabRole[i] = role.name;
        i++;
      }
      tabTabRole[0] = tabRole;
      salarie.roles = tabTabRole;
    }

    return reponse;
  }
  // formatManager(reponse : any){
  //   for (var salarie of reponse) {
  //     let tabRole = Array();
  //     let tabTabRole = Array();
  //     let i = 0;
  //     for(var manager of salarie.manager){
  //       tabRole[i] = manager.username;
  //       i++;
  //     }
  //     tabTabRole[0] = tabRole;
  //     salarie.manager = tabTabRole;
  //   }
  //   return reponse;
  // }

 

/* partie spécifiée à uploading une photo de profile */
public  onFileChanged(event) {
  console.log(event);
  this.selectedFile = event.target.files[0];

  // Below part is used to display the selected image
  let reader = new FileReader();
  reader.readAsDataURL(event.target.files[0]);
  reader.onload = (event2) => {
    this.imgURL = reader.result;
};
}

// This part is for uploading
onUpload() {
const uploadData = new FormData();
uploadData.append('myFile', this.selectedFile, this.selectedFile.name);

this.https.post('http://localhost:8080/api/upload', uploadData)
.subscribe( 
             data => {
               console.log(data);

                     this.receivedImageData = data;
                     this.pic = this.receivedImageData.pic;
                     //"pic" est le nom d'un attribut dans le backend
                     this.base64Data = this.receivedImageData.pic;
                     this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; },
             err => console.log('Error Occured duringng saving: ' + err)
          );
        }

        generer_password() {
          var ok = 'azertyupqsdfghjkmwxcvbn23456789AZERTYUPQSDFGHJKMWXCVBN';
          var pass = '';
          let longueur = 8;
          for(let i=0;i<longueur;i++){
              var wpos = Math.round(Math.random()*ok.length);
              pass+=ok.substring(wpos,wpos+1);
          }
  
          this.crudApi.dataForm.patchValue({
            password: pass
          });
      }
}
