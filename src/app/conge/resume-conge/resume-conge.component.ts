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
  selector: 'app-resume-conge',
  templateUrl: './resume-conge.component.html',
  styleUrls: ['./resume-conge.component.scss']
})
export class ResumeCongeComponent implements OnInit {
 
  listcon:any;
  p: number = 1;
  count: number = 8;
  searchText:any;
  errorMessage: string;
  constructor(public congeService: CongeService,
    private token: TokenStorageService,public salarieService:SalarieService, 
    public typecongeService:TypecongeService,
) { }

  ngOnInit() {
     this.getData();
    }

  
  getData() {
    debugger;

    let username = this.token.getUsername();
    console.log(username);
    this.congeService.getSumCongePris(username)
    .subscribe(
      response =>{
          this.listcon = response["resultat"];
          console.log(response["resultat"]);
          for (var tc of response["resultat"]) {
            if(tc[0]=="Congés legaux")
            {
              let aa=parseInt(this.token.getSoldeConge());
              
               tc[1]= aa;
          tc[3]=tc[1]-tc[2];
          console.log("tc3",tc[3]);
              console.log(tc[1]);
              if (tc[3]<0)
              {
                tc[3]=0
              }
            }
           else {
             if (tc[3]<0)
             {
               tc[3]=0
             }
           }
         };
         
        }
      
     );
  
     
   
  }


  getData1() {
    this.typecongeService.getAll().subscribe(
      response =>{this.typecongeService.listtypecon = response;
        for (var tc of response) {
          if(tc.id_type==9)
          {
            let aa=parseInt(this.token.getSoldeConge());
            
             tc.max_permis= aa;
        
        
            console.log(tc.max_permis);
          }
         
       };
       }
       
      
     );
  
  
  }
 
                 
}
