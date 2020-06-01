import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { SalarieService } from '../service/salarie.service';
import { CongeService } from '../service/conge.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  info: any;
salarie=[];
conge=[];
  constructor(private token: TokenStorageService,private salarieService:SalarieService,private congeService: CongeService) { }

  ngOnInit() {this.get();
  }
  get(){
    this.congeService.getAll().subscribe(
      response =>{this.conge = response;
        console.log(this.conge) 
      },
      error=>console.log(error)
     );
     
  }

  
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  
  public barChartLabels = [
    '2014', '2015', '2016', '2017', '2018', '2019', '2020'
  ];
  
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [this.get()], label: 'Congés'},
    // {data: [65, 59, 80, 81, 56, 55, 40], label: 'Conge'},

    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Salarie'}
  ];

}
