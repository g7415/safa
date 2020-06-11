import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { SalarieService } from '../service/salarie.service';
import { CongeService } from '../service/conge.service';
import {Chart} from 'chart.js';
// For MDB Angular Free
import { ChartsModule, WavesModule } from 'angular-bootstrap-md'
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  info: any;
salarie : number;
conge=[];
annee = "2020";
mois = "04";
LineChart:any;
BarChart:any;
PieChart:any;
submitted = false;
  constructor(private token: TokenStorageService,private salarieService:SalarieService,private congeService: CongeService) { }
  arrayOne(n: number): any[] {
    return Array(n);
  }
  ngOnInit() {
    this.salarieService.getRefresh()
    .subscribe(() => {
      this.stat();
    });

    this.stat();

  }


  get(){
    this.submitted = true;

      this.salarieService.getStatistique1(this.annee + "-" + this.mois).pipe(
        finalize(() => this.submitted = false),
      )
      .subscribe(
        response =>{this.salarie = response[0];
          console.log(this.salarie);
        },
        error=>console.log(error)
       );
  }

 stat(){
   
  this.BarChart = new Chart('barChart', {
    type: 'bar',
  data: {
   labels: [this.annee, "Blue", "Yellow", "Green", "Purple", "Orange"],
   datasets: [{
       label: '# of Votes',
       data: [this.salarie,7 , 3, 5, 2, 10],
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
