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
 
  constructor(public crudApi: SalarieService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddsalarieComponent>) { }

  ngOnInit() {
    this.getData();
  }
  
  addEmploye()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="40%";
    dialogConfig.height="90%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(AddsalarieComponent, dialogConfig);
  }
  debugger;
  getData() {
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.listsal = this.formatRole(response);}
     );
    this.crudApi.getAllRoles().subscribe(
      response =>{this.crudApi.listrol = response;}
     );
  
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
    item.password = '';
    this.crudApi.choixmenu = 2;
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    this.crudApi.dataForm.patchValue({
      manager: item.manager.username,
      
    });
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.height="90%";
    this.matDialog.open(AddsalarieComponent, dialogConfig);
  }

  

  


 


                 


}

