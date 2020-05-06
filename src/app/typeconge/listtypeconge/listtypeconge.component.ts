import { Component, OnInit, Inject } from '@angular/core';
import { TypeConge } from 'src/app/model/typeconge';
import { TypecongeService } from 'src/app/service/typeconge.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { AddtypecongeComponent } from '../addtypeconge/addtypeconge.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listtypeconge',
  templateUrl: './listtypeconge.component.html',
  styleUrls: ['./listtypeconge.component.scss']
})
export class ListtypecongeComponent implements OnInit {
  p: number = 1;
  count: number = 5;
  searchText:any;
  typeconge : TypeConge;
  constructor(public crudApi: TypecongeService, public toastr: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddtypecongeComponent>) { }

  ngOnInit() {
    this.getData();
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
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {this.crudApi.deleteData(id_type)
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

  selectData(item : TypeConge) {
   
    //  item.roles =  [item.roles[0]['name']]
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

