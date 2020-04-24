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

  getData() {
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.listsal = response;}
     );
    this.crudApi.getAllRoles().subscribe(
      response =>{this.crudApi.listrol = response;}
     );
  
  }
  
  removeData(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {this.crudApi.deleteData(id)
          .subscribe(
            data => {
              console.log(data); 
              this.getData();
            },
            error => console.log(error));
      
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  selectData(item : Salarie) {
   
    //  item.roles =  [item.roles[0]['name']]
    this.crudApi.choixmenu = 2;
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.height="90%";
    this.matDialog.open(AddsalarieComponent, dialogConfig);
  }


 


                 


}

