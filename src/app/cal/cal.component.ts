import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { SalarieService } from '../service/salarie.service';
import { CongeService } from '../service/conge.service';
import * as Highcharts from 'highcharts';
import * as Chart from 'chart.js';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-cal',
  templateUrl: './cal.component.html',
  styleUrls: ['./cal.component.scss']
})
export class CalComponent implements OnInit {
  info: any;
  congeRefu : number;
  conge:number;
  annee = "2020";
  mois = "04";
  LineChart:any;
  BarChart:any;
  PieChart:any;
  submitted = false;
  congeEnAtt: any;
  NbMang: any;
  nbRH: any;
  nbEmp: any;
    constructor(private token: TokenStorageService,private salarieService:SalarieService,private congeService: CongeService) { }
  
    ngOnInit() {
      this.salarieService.getRefresh()
      .subscribe(() => {
        this.stat();
      });
  
      this.stat();
    }
  
  
    getStatistiqueNbEmp(){
      debugger;
      this.submitted = true;
        this.salarieService.getStatistiqueNbEmp().pipe(
          finalize(() => this.submitted = false),
        )
        .subscribe(
          response =>{this.nbEmp = response;
            console.log(this.nbEmp);
          },
          error=>console.log(error)
         );
    }
    getStatistiqueNbRH(){
      debugger;
      this.submitted = true;
        this.salarieService.getStatistiqueNbRH().pipe(
          finalize(() => this.submitted = false),
        )
        .subscribe(
          response =>{this.nbRH = response;
            console.log(this.nbRH);
          },
          error=>console.log(error)
         );
    }
    getStatistiqueNbMan(){
      debugger;
      this.submitted = true;
        this.salarieService.getStatistiqueNbMan().pipe(
          finalize(() => this.submitted = false),
        )
        .subscribe(
          response =>{this.NbMang = response;
            console.log(this.NbMang);
          },
          error=>console.log(error)
         );
    }
 
    
    stat(){
      debugger;
      this.BarChart = new Chart('barChart', {
        type: 'bar',
      data: {
       labels: ["Manager", "Responsable RH","Employé"],
       datasets: [{
           label: '# nombre',
           data: [this.NbMang,this.nbRH,this.nbEmp],
           backgroundColor: [
               'rgba(255, 99, 132, 0.2)',
               'rgba(54, 162, 235, 0.2)',
               'rgba(255, 206, 86, 0.2)',
               'rgba(75, 192, 192, 0.2)',
               'rgba(153, 102, 255, 0.2)',
               'rgba(255, 159, 64, 0.2)'
           ],
           borderColor: [
               'rgba(255,99,132,1)',
               'rgba(54, 162, 235, 1)',
               'rgba(255, 206, 86, 1)',
               'rgba(75, 192, 192, 1)',
               'rgba(153, 102, 255, 1)',
               'rgba(255, 159, 64, 1)'
           ],
           borderWidth: 1
       }]
      }, 
      options: {
       title:{
           text:"Statistique ",
           display:true
       },
       scales: {
           yAxes: [{
               ticks: {
                   beginAtZero:true
               }
           }]
       }
      }
      });
      
  
   }
  


  }
  