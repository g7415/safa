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
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { SalarieService } from 'src/app/service/salarie.service';
import { Salarie } from 'src/app/model/salarie';
@Component({
  selector: 'app-listconge-by-manager',
  templateUrl: './listconge-by-manager.component.html',
  styleUrls: ['./listconge-by-manager.component.scss']
})
export class ListcongeByManagerComponent implements OnInit {
  listtypecon:TypeConge[];
  listcon:Conge[];
  usr : Salarie;
  p: number = 1;
  count: number = 8;
  searchText:any;
  con : Conge;
  conge:any
ll:any;
  info: any;
  sal : Salarie;
  userUpdated: Object;
  errorMessage: string;
  constructor(public crudApi: CongeService, public toastr: ToastrService,
    private token: TokenStorageService,public salarieService:SalarieService, 
    private router : Router,public fb: FormBuilder,public typecongeService:TypecongeService,
    //Pour le popup (ajouter congé)
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddcongeComponent>,) { }

  ngOnInit() {
    // this.salarieService.getProfil(this.token.getUsername())
    // .subscribe(
    //   data => {
    //     this.usr = data;
    //   console.log(data);
    //   this.token.saveUsername(data.username);
     
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
    this.getData();
    

  }
  // getProfil(){  
  //    this.salarieService.getProfil(this.token.getUsername())
  //   .subscribe(
  //     data => {
  //       this.usr = data;
  //     console.log(data);
  //     this.token.saveUsername(data.username);
     
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }
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
    debugger;

    let id = parseInt(this.token.getId());
    console.log(id);
    this.crudApi.getConByManager(id)
  
    .subscribe(
      response =>{this.listcon = this.zz(response);
      
      }
     );
      this.typecongeService.getAll().subscribe(
      response =>{this.listtypecon = response;}
     );
    //  this.getProfil();
  }
 
  zz(response:any){
    console.log(response.sort(function(a,b){ return b.num-a.num } ));
    return response;
}
  aaa(response:any)
  {
  const sortBy = ["en attente", "accepter", "refuser"];
  const customSort = ({ data, sortBy, sortField }) => {
    const sortByObject = sortBy.reduce(
      (obj, item, index) => ({
        ...obj,
        [item]: index
      }),
      {}
    );
    return data.sort(
      (a, b) => sortByObject[a[sortField]] - sortByObject[b[sortField]]
    );
  };
  const tasksWithDefault = response.map(item => ({
    ...item,
    sortStatus: sortBy.includes(item.statut) ? item.statut : "other"
  }));
  console.log(
    customSort({
      data: tasksWithDefault,
      sortBy: [...sortBy, "other"],
      sortField: "sortStatus"
    })
  );
  return(tasksWithDefault)
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
      if (result.value) {this.crudApi.deleteData(num)
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
// if(item.statut=="accepter"){
this.crudApi.creatEmail2(item)
.subscribe(
 res => {
 this.conge = res;
 console.log(this.conge);
 alert('Email Sent successfully');
 });
// }
//  else{
//   this.crudApi.creatEmail3(item)
//   .subscribe(
//    res => {
//    this.conge = res;
//    console.log(this.conge);
//    alert('Email Sent successfully');
//    });
//  }
 this.getData();

  })

}  
                 
}
