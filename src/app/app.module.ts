import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatDialogModule,MatDialogRef, } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { AddsalarieComponent } from './salarie/addsalarie/addsalarie.component';
import { ListsalarieComponent } from './salarie/listsalarie/listsalarie.component';
import { AddcongeComponent } from './conge/addconge/addconge.component';
import { ListcongeComponent } from './conge/listconge/listconge.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatSliderModule } from '@angular/material/slider';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfilComponent } from './profil/profil.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { httpInterceptorProviders } from './auth/auth-interceptor.interceptor';
import {NgxPaginationModule} from 'ngx-pagination';
import { TypecongeComponent } from './typeconge/typeconge.component';
import { AddtypecongeComponent } from './typeconge/addtypeconge/addtypeconge.component';
import { ListtypecongeComponent } from './typeconge/listtypeconge/listtypeconge.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { TreeViewModule } from "@syncfusion/ej2-angular-navigations";
import { DateValueAccessorModule } from 'angular-date-value-accessor';
import { ChartsModule } from 'ng2-charts';
// import { MatFormFieldModule, MatInputModule } from '@angular/material';
// import { MaterialModule } from '@angular/material';

import {
  DropDownListAllModule,
  MultiSelectAllModule
} from "@syncfusion/ej2-angular-dropdowns";

import {
  MaskedTextBoxModule,
  UploaderAllModule
} from "@syncfusion/ej2-angular-inputs";

import {
  ToolbarAllModule,
  ContextMenuAllModule
} from "@syncfusion/ej2-angular-navigations";

import { ButtonAllModule } from "@syncfusion/ej2-angular-buttons";

import { CheckBoxAllModule } from "@syncfusion/ej2-angular-buttons";

import {
  DatePickerAllModule,
  TimePickerAllModule,
  DateTimePickerAllModule
} from "@syncfusion/ej2-angular-calendars";

import { NumericTextBoxAllModule } from "@syncfusion/ej2-angular-inputs";

import {
  ScheduleAllModule,
  RecurrenceEditorAllModule
} from "@syncfusion/ej2-angular-schedule";
import { CommonModule } from "@angular/common";
import { HistoriqueListCongeComponent } from './conge/historique-list-conge/historique-list-conge.component';
import { EditProfileComponent } from './profil/edit-profile/edit-profile.component';
import { UpdatePasswordComponent } from './salarie/update-password/update-password.component';
import { ReinitialiseMdpComponent } from './login/reinitialise-mdp/reinitialise-mdp.component';
import { ListcongeByManagerComponent } from './conge/listconge-by-manager/listconge-by-manager.component';
import { Listsalarie2Component } from './salarie/listsalarie2/listsalarie2.component';
import { ResetPasswordEmailComponent } from './login/reset-password-email/reset-password-email.component';
import { ViewGraphComponent } from './view-graph/view-graph.component';
import { CalComponent } from './cal/cal.component';
import { ResumeCongeComponent } from './conge/resume-conge/resume-conge.component';
import { CommentaireComponent } from './conge/commentaire/commentaire.component';



const MATERIAL_MODULES = [MatToolbarModule,
  MatIconModule
]; 

  const appRoutes : Routes = [
    {path: 'stat', component:TypecongeComponent},
    //{path:'', redirectTo :"listconge" , pathMatch:"full"},
    {path: 'commentaire', component:CommentaireComponent },
    {path: 'resumeConge', component:ResumeCongeComponent },

    {path: 'view-graph', component:ViewGraphComponent },
    {path: 'cal', component:CalComponent },

    {path: 'listsalarie2', component:Listsalarie2Component },
    {path: 'listcongeByManager', component: ListcongeByManagerComponent},
    {path: 'reinitialiseMdp', component: ReinitialiseMdpComponent},
    {path: 'resetPassordEmail', component: ResetPasswordEmailComponent},

    {path: 'updatePassword', component: UpdatePasswordComponent},
    {path: 'editProfile', component: EditProfileComponent},
    {path: 'navbar', component: NavbarComponent},
    {path: 'conge', component: AddcongeComponent},
    {path: 'listconge', component: ListcongeComponent},
    {path: 'profil', component: ProfilComponent},
    {path: 'signin', component: SigninComponent},
    {path: 'historiqueListConge', component: HistoriqueListCongeComponent},
    {path: 'salarie', component: AddsalarieComponent},
    {path: 'listsalarie', component: ListsalarieComponent},
    {path: 'typeconge', component: AddtypecongeComponent},
    {path: 'listtypeconge', component: ListtypecongeComponent},
    {path: 'calendrier', component: CalendrierComponent},
    {
      path: 'home',
      component: HomeComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
},
{
  path: '',
  redirectTo: 'auth/login',
  pathMatch: 'full'
}
  ]
@NgModule({
  declarations: [
    AppComponent,
    AddsalarieComponent,
    ListsalarieComponent,
    AddcongeComponent,
    ListcongeComponent,
    NavbarComponent,
    ProfilComponent,
    SigninComponent,
    HomeComponent,
    LoginComponent,
    TypecongeComponent,
    AddtypecongeComponent,
    ListtypecongeComponent,
    CalendrierComponent,
    HistoriqueListCongeComponent,
    EditProfileComponent,
    UpdatePasswordComponent,
    ReinitialiseMdpComponent,
    ListcongeByManagerComponent,
    Listsalarie2Component,
    ResetPasswordEmailComponent,
    ViewGraphComponent,
    CalComponent,
    ResumeCongeComponent,
    CommentaireComponent
  ],
  imports: [
    DateValueAccessorModule,Ng2SearchPipeModule ,NgxPaginationModule,ChartsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    NgMatSearchBarModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot(),
    CommonModule,
   
    ScheduleAllModule,
    RecurrenceEditorAllModule,
    NumericTextBoxAllModule,
    DatePickerAllModule,
    TimePickerAllModule,
    DateTimePickerAllModule,
    CheckBoxAllModule,
    ToolbarAllModule,
    DropDownListAllModule,
    ContextMenuAllModule,
    MaskedTextBoxModule,
    UploaderAllModule,
    MultiSelectAllModule,
    TreeViewModule,
    ButtonAllModule,
  
  ],
  exports : MATERIAL_MODULES,
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {}  }, httpInterceptorProviders],
  bootstrap: [AppComponent], 
  entryComponents: [AddsalarieComponent],
  
})
export class AppModule { }
