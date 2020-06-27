import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { TokenStorageService } from '../auth/token-storage.service';
import { CongeService } from '../service/conge.service';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
  PieChart:any;
  congeRefu : any=0;
  conge:any=0;
  congeEnAtt: any;
  constructor(private token: TokenStorageService,private congeService: CongeService) { }

  ngOnInit(): void {
    
    this.getData();

 



  }


  async getPromise() {
    const promiseGet= await this.congeService.getStatistiqueNbConAcc1().toPromise()
     return promiseGet;
    
   } 
   async getPromise1() {
    const promiseGet= await this.congeService.getStatistiqueNbConEnAttente1().toPromise()
     return promiseGet;
    
   } 
   async getPromise2() {
    const promiseGet= await this.congeService.getStatistiqueNbConRefu1().toPromise()
     return promiseGet;
    
   } 
   async getData(){
    await this.getPromise().then((res)=>{
      console.log('stat',res)
      this.conge = res
    }); console.log('val',this.conge);

    await this.getPromise1().then((res)=>{
      console.log('stat',res)
      this.congeEnAtt = res
    }); console.log('val1',this.congeEnAtt);
    await this.getPromise2().then((res)=>{
      console.log('stat',res)
      this.congeRefu = res
    }); console.log('val1',this.congeRefu);


    // pie chart:
this.PieChart = new Chart('pieChart', {
  type: 'pie',
data: {
  labels: ["congé accepté", "congé refusé","congé en attente"],
  datasets: [{
   label: 'Nombre de congés acceptés , refusés et en attente',
     data: [ this.conge,this.congeRefu, this.congeEnAtt],
     backgroundColor: [
      'rgba(17, 190, 176, 0.842)',
      // 'rgba(76, 204, 26, 0.637)',
      
      'rgba(27, 209, 154, 0.26)',
      'rgba(18,235,78,0.62)'
        //  'rgba(75, 192, 192, 0.2)',
        //  'rgba(153, 102, 255, 0.2)',
        //  'rgba(255, 159, 64, 0.2)'
     ],
   
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
    
  }
}
