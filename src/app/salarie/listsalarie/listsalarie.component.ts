import { Component, OnInit, Inject  } from '@angular/core';
import {FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from "rxjs";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SalarieService } from 'src/app/service/salarie.service';
import { AddsalarieComponent } from '../addsalarie/addsalarie.component';
import { Salarie } from 'src/app/model/salarie';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
@Component({
  selector: 'app-listsalarie',
  templateUrl: './listsalarie.component.html',
  styleUrls: ['./listsalarie.component.scss']
})
export class ListsalarieComponent implements OnInit {
  searchText:any;
  sal : Salarie;
  p: number = 1;
  count: number = 5;
  fileUploads: Observable<string[]>;
  private roles: string[];
  authority: string;
  pic:any;
  base64Data: string;
  convertedImage: string;
  constructor(public crudApi: SalarieService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder
    ,private tokenStorage: TokenStorageService,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddsalarieComponent>) { }

  ngOnInit() {
    this.getData();
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_MANAGER') {
          this.authority = 'manager';
          return false;
        } else if (role === 'ROLE_RH') {
          this.authority = 'rh';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }
  
  addEmploye()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="40%";
    dialogConfig.height="95%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(AddsalarieComponent, dialogConfig);
  }


  getData() {
    this.crudApi.getAll().subscribe(
      response =>{
        this.crudApi.listsal = this.formatRole(response);
        for (var salarie of response) {
           this.pic= salarie.pic
          //  console.log(this.pic);
          this.base64Data = atob(this.pic);
          this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; 
          salarie.pic = this.convertedImage;
          console.log(salarie.pic);
        };
        }
     );
    this.crudApi.getAllRoles().subscribe(
      response =>{this.crudApi.listrol = response;}
     );
    
      //  this.crudApi.getFiles().subscribe(
      //      response =>{this.fileUploads = response;})
      
  }
formatPic(response:any){ 
  for (var salarie of response) {
  let pic= btoa(salarie.pic)}
  return response;
}
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
  
  removeData(id: number) {
    Swal.fire({
      title: 'Etes vous sur?',
      text: "Vous ne pourrez plus revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!'
      
    }).then((result) => {
      if (result.value) {this.crudApi.deleteData(id)
          .subscribe(
            data => {
              console.log(data); 
              this.getData();
            },
            error => console.log(error));
      
        Swal.fire(
          
          'Utilisateur supprimer avec succes.',
         
        )
      }
    })
  }

  selectData(item : Salarie) {
    // item.roles = [item.roles[0]['name']];
    debugger;
    // item.password = '';
    this.crudApi.choixmenu = 2;
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    if(item.manager){
      this.crudApi.dataForm.patchValue({
        manager: item.manager.username,
        
      });
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.height="90%";
    this.matDialog.open(AddsalarieComponent, dialogConfig);
  }

  

  


 


                 


}

