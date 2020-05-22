import { Component, OnInit, Inject } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { SalarieService } from '../service/salarie.service';
import { group } from '@angular/animations';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddsalarieComponent } from '../salarie/addsalarie/addsalarie.component';
import { Salarie } from '../model/salarie';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  info: any;
  sal : Salarie;
  salarie:any;
  errorMessage: string;
  toastr: any;

  receivedImageData:any;
  base64Data: any;
  convertedImage: any;


  constructor(private token: TokenStorageService,public salarieService:SalarieService, public crudApi: SalarieService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddsalarieComponent>) { }
  //  input = this.myForm.get('monElement')


  ngOnInit() {
    this.salarieService.getProfil(this.token.getUsername()).subscribe(
      data => {
      console.log(data);
      this.sal=data;
      this.token.saveUsername(data.username);
      this.token.saveNom(data.nom);
      this.token.savePrenom(data.prenom);
      this.token.saveMail(data.mail);
      this.token.saveGrade(data.grade);
      this.token.saveGroupe(data.groupe);
      this.token.saveNom_responsable(data.nom_responsable);
      this.token.savePassword(data.password);
      this.token.saveNumero(data.num_tel);
      this.token.saveDate_entree(data.date_entree);
      this.token.saveId(data.id);
      this.receivedImageData = data;
      this.base64Data = atob(this.receivedImageData.pic);
      this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;

      this.info = {
        token: this.token.getToken(),
        username: this.token.getUsername(),
        nom: this.token.getNom(),
        prenom: this.token.getPrenom(),
        authorities: this.token.getAuthorities(),
        mail:this.token.getMail(),
        grade:this.token.getGrade(),
        num_tel:this.token.getNumero(),
        groupe:this.token.getGroupe(),
        nom_responsable:this.token.getNom_responsable(),
        date_entree:this.token.getDate_entree(),
        password:this.token.getPassword(),
        id:this.token.getId()
      };

      },
      error => {
        console.log(error);
      }
    );
   
    // if (!localStorage.getItem('foo')) { 
    //   localStorage.setItem('foo', 'no reload') 
    //   location.reload() 
    // } else {
    //   localStorage.removeItem('foo') 
    // }
  }
 
  selectData() { 
    this.router.navigate(['/editProfile']);
    console.log("Success Navigation");
    // let userId = this.token.getId();
    // this.salarieService.getData(parseInt(userId)).subscribe(
    //   data=>this.sal=data,
    //   error=>console.log(error)
    //     );
  }
  select() { 
    this.router.navigate(['/updatePassword']);
    console.log("Success Navigation");
   
  }

 
}

