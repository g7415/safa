import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { SalarieService } from '../service/salarie.service';
import { CongeService } from '../service/conge.service';
import * as Highcharts from 'highcharts';
declare var require: any;
@Component({
  selector: 'app-view-graph',
  templateUrl: './view-graph.component.html',
  styleUrls: ['./view-graph.component.scss']
})
export class ViewGraphComponent implements OnInit {
  info: any;
  salarie=[];
  conge=[];
    constructor(private token: TokenStorageService,private salarieService:SalarieService,private congeService: CongeService) { }
  public options: any = {
    Chart: {
      type: 'area',
      height: 700
    },
    title: {
      text: 'Evolution de la population'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: ['2016', '2017', '2018', '2019', '2020', '2021', '2022'],
      tickmarkPlacement: 'on',
      title: {
          enabled: false
      }
  },
    series: [
      {
      name: 'Asia',
      data: [502, 635, 809, 947, 1402, 3634, 5268]
  }, {
      name: 'Europe',
      data: [163, 203, 276, 408, 547, 729, 628]
  }, {
      name: 'congés',
      conge: [this.get(this.conge)]
  }]
  }
  get(response:any){
    this.congeService.getAll().subscribe(
      response =>{this.conge = response;
        console.log(this.conge) 
      },
      error=>console.log(error)
     );
   return  (response)
  }
  ngOnInit() {
    Highcharts.chart('container', this.options);
  }
}