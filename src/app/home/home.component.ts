import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { SalarieService } from '../service/salarie.service';
import { CongeService } from '../service/conge.service';
// For MDB Angular Free
import { ChartsModule, WavesModule } from 'angular-bootstrap-md'
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
public chartType: string = 'bar';
  constructor(private token: TokenStorageService,private salarieService:SalarieService,private congeService: CongeService) { }

  ngOnInit() {
    // this.salarieService.getRefresh()
    // .subscribe(() => {
    //   this.get();
    // })
  }

  get(){

      this.salarieService.getStatistique1(this.annee + "-" + this.mois).subscribe(
        response =>{this.salarie = response;
          console.log(this.salarie);
        },
        error=>console.log(error)
       );
    
  }

  

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  
  public barChartLabels = [
    '2006', '2007', '2008', '2009', '2010', '2011', '2012'
  ];
  
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
  

}
