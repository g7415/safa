
import { Component, ViewChild, ViewEncapsulation} from '@angular/core';
import { extend } from "@syncfusion/ej2-base";
import {
  EventSettingsModel,
  View,
  EventRenderedArgs,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  ResizeService,
  ScheduleComponent,
  DragAndDropService
} from "@syncfusion/ej2-angular-schedule";
import { zooEventsData } from 'src/data';
import { CongeService } from '../service/conge.service';
import { Router } from '@angular/router';
import { TypecongeService } from '../service/typeconge.service';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss'],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    ResizeService,
    DragAndDropService
  ],
  encapsulation: ViewEncapsulation.None
})
export class CalendrierComponent {

    @ViewChild("scheduleObj")
  public scheduleObj: ScheduleComponent;

  public data: Object[] = <Object[]>extend([], zooEventsData, null, true);
  public selectedDate: Date = new Date(2018, 1, 15);
  public eventSettings: EventSettingsModel = { dataSource: this.data };
  public currentView: View = "Week";
  public flag = true;
    listtypecon: any;
  constructor(public crudApi: CongeService, 
    private router : Router,public fb: FormBuilder,public typecongeService:TypecongeService,
   
   ) { }

  ngOnInit() {
    this.getData();
  }
  onActionBegin(args) {
    if (
      args.requestType == "eventCreate" ||
      args.requestType == "eventChange" ||
      args.requestType == "eventRemove"
    ) {
      this.flag = false;
    } else {
      this.flag = true;
    }
  }
  getData() {
    
    // this.crudApi.getAll().subscribe(
    //   response =>{this.crudApi.listcon = response;}
    //  );
    this.crudApi.getListConByStatut().subscribe(
      response =>{this.crudApi.listcon = response;}
     );
      this.typecongeService.getAll().subscribe(
      response =>{this.listtypecon = response;}
     );
  }
  oneventRendered(args: any): void {
    if (this.flag) {
      if (
        this.scheduleObj.currentView !== "Month" &&
        this.scheduleObj.currentView !== "Agenda"
      ) {
        var currentViewDates = this.scheduleObj.getCurrentViewDates();
        console.log("hello");
        // for (var i = 0; i < currentViewDates.length; i++) {
        //   switch ((currentViewDates[i] as any).getDay()) {
        //     case 0:
        //       this.scheduleObj.setWorkHours(
        //         [currentViewDates[i]],
        //         "06:00",
        //         "14:00"
        //       );
        //       break;
        //     case 1:
        //       this.scheduleObj.setWorkHours(
        //         [currentViewDates[i]],
        //         "08:00",
        //         "14:00"
        //       );
        //       break;
        //     case 2:
        //       this.scheduleObj.setWorkHours(
        //         [currentViewDates[i]],
        //         "07:00",
        //         "20:00"
        //       );
        //       break;
        //     case 3:
        //     debugger;
        //       this.scheduleObj.setWorkHours(
        //         [currentViewDates[i]],
        //         "09:00",
        //         "13:00"
        //       );
        //       break;
        //     case 4:
        //     debugger
        //        this.scheduleObj.setWorkHours(
        //         [currentViewDates[i]],
        //         "06:00",
        //         "14:00"
        //       );
        //       break;
        //     case 5:
        //     debugger
        //       this.scheduleObj.setWorkHours(
        //         [currentViewDates[i]],
        //         "08:00",
        //         "15:00"
        //       );
        //       break;
        //     case 6:
        //       this.scheduleObj.setWorkHours(
        //         [currentViewDates[i]],
        //         "07:00",
        //         "19:00"
        //       );
        //   }
        // }
      }
      this.flag = false;
    }
  }
}
