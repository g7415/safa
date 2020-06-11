import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { SalarieService } from '../service/salarie.service';
import { CongeService } from '../service/conge.service';
import * as Highcharts from 'highcharts';
import * as Chart from 'chart.js';
import { finalize } from 'rxjs/operators';
declare var require: any;
@Component({
  selector: 'app-view-graph',
  templateUrl: './view-graph.component.html',
  styleUrls: ['./view-graph.component.scss']
})
export class ViewGraphComponent implements OnInit {
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
    constructor(private token: TokenStorageService,private salarieService:SalarieService,private congeService: CongeService) { }
  
    ngOnInit() {
      this.congeService.getRefresh()
      .subscribe(() => {
        this.stat();
      });
  
      this.stat();
    }
  
  
    getNrCongAcc(){
      debugger;
      this.submitted = true;
        this.congeService.getStatistiqueNbConAcc().pipe(
          finalize(() => this.submitted = false),
        )
        .subscribe(
          response =>{this.conge = response;
            console.log(this.conge);
          },
          error=>console.log(error)
         );
    }
    getNrCongRefu(){
      debugger;
      this.submitted = true;
        this.congeService.getStatistiqueNbConRefu().pipe(
          finalize(() => this.submitted = false),
        )
        .subscribe(
          response =>{this.congeRefu = response;
            console.log(this.congeRefu);
          },
          error=>console.log(error)
         );
    }
    getNrCongEnAtt(){
      debugger;
      this.submitted = true;
        this.congeService.getStatistiqueNbConEnAttente().pipe(
          finalize(() => this.submitted = false),
        )
        .subscribe(
          response =>{this.congeEnAtt = response;
            console.log(this.congeEnAtt);
          },
          error=>console.log(error)
         );
    }
    
    stat(){
      debugger;
      this.BarChart = new Chart('barChart', {
        type: 'bar',
      data: {
       labels: ["congé accepter", "congé refuser","congé en attente"],
       datasets: [{
           label: '# of Votes',
           data: [this.conge,this.congeRefu,this.congeEnAtt],
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
           text:"Bar Chart",
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
  