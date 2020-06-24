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
        this.stat1();
      });
  
      this.stat1();
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
  

   
   stat1(){
     // pie chart:
this.PieChart = new Chart('pieChart', {
  type: 'pie',
data: {
 labels: ["congé accepté", "congé refusé","congé en attente"],
 datasets: [{
  label: 'Nombre de congés acceptés , refusés et en attente',
  data: [this.conge,this.congeRefu,this.congeEnAtt],
     backgroundColor: [
      // 'rgba(191,255,0,0.91)',
      // 'rgba(132, 207, 166, 0.637)',
       

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
    //      'rgba(255,99,132,1)',
    //      'rgba(54, 162, 235, 1)',
    //      'rgba(255, 206, 86, 1)',
    //      'rgba(75, 192, 192, 1)',
    //      'rgba(153, 102, 255, 1)',
    //      'rgba(255, 159, 64, 1)'
    //  ],
     borderWidth: 1
 }]
}, 
options: {
 title:{
     text:"Statistique",
     display:true
 },
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

  //   this.LineChart = new Chart('lineChart', {
  //     type: 'line',
  //   data: {
  //    labels:["congé accepté", "congé refusé","congé en attente"],
  //    datasets: [{
  //        label: 'Nombre de congés acceptés , refusés et en attente',
  //        data: [this.conge,this.congeRefu,this.congeEnAtt],
  //        fill:false,
  //        lineTension:0.2,
  //        borderColor:"green",
  //        borderWidth: 2
  //    }]
  //   }, 
  //   options: {
  //    title:{
  //        text:"Statistique",
  //        display:true
  //    },
  //    scales: {
  //        yAxes: [{
  //            ticks: {
  //                beginAtZero:true
  //            }
  //        }]
  //    }
  //   }
  //   });
   }
  }
  