import { Component, OnInit, Inject  } from '@angular/core';
import {FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from "rxjs";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CongeService } from 'src/app/service/conge.service';
import { AddcongeComponent } from '../addconge/addconge.component';
import { Conge } from 'src/app/model/conge';
import Swal from 'sweetalert2';
import { TypecongeService } from 'src/app/service/typeconge.service';
import { TypeConge } from 'src/app/model/typeconge';

@Component({
  selector: 'app-listconge',
  templateUrl: './listconge.component.html',
  styleUrls: ['./listconge.component.scss']
})
export class ListcongeComponent implements OnInit {
  listtypecon:TypeConge[];
  p: number = 1;
  count: number = 8;
  searchText:any;
  con : Conge;
  conge:any
  constructor(public crudApi: CongeService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,public typecongeService:TypecongeService,
    //Pour le popup (ajouter congé)
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddcongeComponent>,) { }

  ngOnInit() {
    this.getData();
  }
 
   addConge()
  {
 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="40%";
    dialogConfig.height="90%";
    this.matDialog.open(AddcongeComponent, dialogConfig);
  }

  getData() {
    
    // this.crudApi.getAll().subscribe(
    //   response =>{this.crudApi.listcon = response;}
    //  );
    this.crudApi.getListConByStatut().subscribe(
      response =>{this.crudApi.listcon = response;}
     );
      this.typecongeService.getAll().subscribe(
      response =>{this.listtypecon = response;}
     );
  }
  
  removeData(num: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value)
       {this.crudApi.deleteData(num)
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
  
  selectData(item : Conge) {
    this.crudApi.choixmenu = 2;
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    this.crudApi.dataForm.patchValue({
      salarie: item.salarie.id,
      typeconge: item.typeconge.id_type
    });
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="40%";
    dialogConfig.height="90%";
    
    this.matDialog.open(AddcongeComponent, dialogConfig);
     
  }
 

congeRefuser(num: number,item : Conge){ 
  this.crudApi.updateCongRefuser(num,item)
  .subscribe(data =>{this.conge = data;
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Congé refuser',
      showConfirmButton: false,
      timer: 1500
})
this.crudApi.creatEmail3(item)
.subscribe(
 res => {
 this.conge = res;
 console.log(this.conge);
 alert('Email Sent successfully');
 });
 this.getData();
  })
} 

congeAccepter(num: number,item : Conge){ 
  this.crudApi.updateCongAccep(num,item)
  .subscribe(data =>{this.conge = data;
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Congé accepter',
      showConfirmButton: false,
      timer: 1500
})

this.crudApi.creatEmail2(item)
.subscribe(
 res => {
 this.conge = res;
 console.log(this.conge);
 alert('Email Sent successfully');
 });
 this.getData();

  })

}  



}
