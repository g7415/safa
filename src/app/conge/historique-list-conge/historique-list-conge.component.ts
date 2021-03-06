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
  selector: 'app-historique-list-conge',
  templateUrl: './historique-list-conge.component.html',
  styleUrls: ['./historique-list-conge.component.scss']
})
export class HistoriqueListCongeComponent implements OnInit {
  listtypecon:TypeConge[];
  listcon:Conge[];
  usr : Salarie;
  p: number = 1;
  count: number = 8;
  searchText:any;
  con : Conge;
  info: any;
  sal : Salarie;
  userUpdated: Object;
  errorMessage: string;
   a : Conge;

  c: Conge[];
  // statut: string;
  constructor(public crudApi: CongeService, public toastr: ToastrService,
    private token: TokenStorageService,public salarieService:SalarieService, 
    private router : Router,public fb: FormBuilder,public typecongeService:TypecongeService,
    //Pour le popup (ajouter congé)
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddcongeComponent>,) {
      // this.c=this.listcon; 
    }

  ngOnInit() {
  
    this.getData();
   
  }
  zz(response:any){
    console.log(response.sort(function(a,b){ return b.num-a.num } ));
    return response;
}
  // filtrer(){
  //   this.c=this.crudApi.listcon.filter(a => a.statut.startsWith(this.statut));
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
    this.crudApi.getCongeByUsernameSal(this.token.getUsername())
    .subscribe(
      response =>{this.listcon=this.zz(response);}
     );
      this.typecongeService.getAll().subscribe(
      response =>{this.listtypecon = response;}
     );
  }
  
  removeData(num: number) {
    Swal.fire({
      title: 'Etes vous sur?',
      text: "Vous ne pourrez plus revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!'
    }).then((result) => {
      if (result.value) {this.crudApi.deleteData(num)
          .subscribe(
            data => {
              console.log(data); 
              this.getData();
            },
            error => console.log(error));
      
        Swal.fire(
          'Congé supprimer avec succes.',
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
 
                 
}
