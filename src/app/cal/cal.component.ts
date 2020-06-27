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
  
    ngOnInit(): void {
    
      this.getData();
  
   
  
  
  
    }
  
  
    async getPromise() {
      const promiseGet= await this.salarieService.getStatistiqueNbEmp1().toPromise()
       return promiseGet;
      
     } 
     async getPromise1() {
      const promiseGet= await this.salarieService.getStatistiqueNbRH1().toPromise()
       return promiseGet;
      
     } 
     async getPromise2() {
      const promiseGet= await this.salarieService.getStatistiqueNbMan1().toPromise()
       return promiseGet;
      
     } 
     async getData(){
      await this.getPromise().then((res)=>{
        console.log('stat',res)
        this.nbEmp = res
      }); console.log('val',this.nbEmp);
  
      await this.getPromise1().then((res)=>{
        console.log('stat',res)
        this.nbRH = res
      }); console.log('val1',this.NbMang);
      await this.getPromise2().then((res)=>{
        console.log('stat',res)
        this.NbMang = res
      }); console.log('val1',this.NbMang);
  
  
      this.BarChart = new Chart('barChart', {
        type: 'bar',
      data: {
       labels: ["Manager", "Responsable RH","Employé"],
       datasets: [{
        label: 'Nombre de Manager , Responsable RH , Employé',
           data: [this.NbMang,this.nbRH,this.nbEmp],
           backgroundColor: [
            'rgba(17, 190, 176, 0.842)',
            // 'rgba(76, 204, 26, 0.637)',
            
            'rgba(27, 209, 154, 0.26)',
            'rgba(18,235,78,0.62)'
              //  'rgba(255, 99, 132, 0.2)',
              //  'rgba(54, 162, 235, 0.2)',
              //  'rgba(255, 206, 86, 0.2)',
              //  'rgba(75, 192, 192, 0.2)',
              //  'rgba(153, 102, 255, 0.2)',
              //  'rgba(255, 159, 64, 0.2)'
           ],
          //  borderColor: [
          //   'rgba(17, 190, 176, 1)',
         
            
          //   'rgba(27, 209, 154,0,26)',
          //   'rgba(18,235,78,1)'
            
          //  ],
           borderWidth: 1
       }]
      }, 
      options: {
       title:{
           text:"Statistique ",
           display:true
       },
       tooltips:{enabled:true},
       scales: {
           yAxes: [{
               ticks: {
                   beginAtZero:true
               }
           }],
           xAxes: [{
            ticks: {
              beginAtZero: true,            
          }
        }]
       }
      }
      });
      
    }
  }
  
   
  


  
  