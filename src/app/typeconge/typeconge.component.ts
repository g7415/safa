import { Component, OnInit } from '@angular/core';
import { Label, MultiDataSet, Color } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { TokenStorageService } from '../auth/token-storage.service';
import { CongeService } from '../service/conge.service';

@Component({
  selector: 'app-typeconge',
  templateUrl: './typeconge.component.html',
  styleUrls: ['./typeconge.component.scss']
})
export class TypecongeComponent  {
  info: any;
  congeRefu : any=0;
  conge:any=0;
  congeEnAtt: any;
  public colors: Array<Color> = [{}];
  doughnutChartData: MultiDataSet = [
    [this.conge,this.congeRefu,this.congeEnAtt ]
  ];
    constructor(private token: TokenStorageService,private congeService: CongeService) { }
  
    ngOnInit() {
   
    this.getData();  
    }

  doughnutChartLabels: Label[] =["congé accepter", "congé refuser","congé en attente"];
  
  public doughnutChartColors: Color[] = [
   
    {backgroundColor:['rgba(17, 190, 176, 0.842)','rgba(27, 209, 154, 0.26)','rgba(18,235,78,0.62)']},
    
  ];
  doughnutChartType: ChartType = 'doughnut';

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

  this.doughnutChartData =[
      [ this.conge,this.congeRefu, this.congeEnAtt]
    ]
    
    
  }


}
