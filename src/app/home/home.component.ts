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
    // this.congeService.getAll().subscribe(
    //   response =>{this.conge = response,
    //     error=>console.log(error)
    //   }
    //  );
    // this.salarieService.getAll().subscribe(
    //   response =>{this.salarie = this.formatRole(response),
    //     error=>console.log(error)
    //   }
    //  );
    // this.salarieService.getAllRoles().subscribe(
    //   response =>{this.salarieService.listrol = response,
    //     error=>console.log(error)
    //   }
    //  );
    // this.info = {
    //   token: this.token.getToken(),
    //   username: this.token.getUsername(),
    //   authorities: this.token.getAuthorities(),
    // };
  }
  get(){
    this.congeService.getAll().subscribe(
      response =>{this.conge = response,
        error=>console.log(error)
      }
     );
  }
  formatRole(reponse : any){
    for (var salarie of reponse) {
      let tabRole = Array();
      let tabTabRole = Array();
      let i = 0;
      for(var role of salarie.roles){
        tabRole[i] = role.name;
        i++;
      }
      tabTabRole[0] = tabRole;
      salarie.roles = tabTabRole;
    }
    return reponse;
  }
  // logout() {
  //   this.token.signOut();
  //   window.location.reload();
  //   // this.router.navigate(['auth/login']);

  // }
  
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
    // {data: [this.get()], label: 'Series A'},
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Conge'},

    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Salarie'}
  ];

}
