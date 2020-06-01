import { Component, OnInit, Inject } from '@angular/core';
import { TypeConge } from 'src/app/model/typeconge';
import { TypecongeService } from 'src/app/service/typeconge.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { AddtypecongeComponent } from '../addtypeconge/addtypeconge.component';
import Swal from 'sweetalert2';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-listtypeconge',
  templateUrl: './listtypeconge.component.html',
  styleUrls: ['./listtypeconge.component.scss']
})
export class ListtypecongeComponent implements OnInit {
  p: number = 1;
  count: number = 8;
  searchText:any;
  typeconge : TypeConge;
  private roles: string[];
  authority: string;
  constructor(public crudApi: TypecongeService, public toastr: ToastrService
    ,private tokenStorage: TokenStorageService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddtypecongeComponent>) { }

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
  
  addTypeConge()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="40%";
    dialogConfig.height="90%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(AddtypecongeComponent, dialogConfig);
  }

  getData() {
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.listtypecon = response;}
     );
  
  
  }
  
  removeData(id_type: number) {
    Swal.fire({
      title: 'Etes vous sur?',
      text: "Vous ne pourrez plus revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!'
    }).then((result) => {
      if (result.value) {this.crudApi.deleteData(id_type)
          .subscribe(
            data => {
              console.log(data); 
              this.getData();
            },
            error => console.log(error));
      
        Swal.fire(
          'Type de congé est supprimer avec succes.'
          
        )
      }
    })
  }

  selectData(item : TypeConge) {
    this.crudApi.choixmenu = 2;
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.height="90%";
    this.matDialog.open(AddtypecongeComponent, dialogConfig);
  }


 


                 


}

