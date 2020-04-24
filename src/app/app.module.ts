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

const MATERIAL_MODULES = [MatToolbarModule,
  MatIconModule
]; 

  const appRoutes : Routes = [
    //{path:'', redirectTo :"listconge" , pathMatch:"full"},
    {path: 'navbar', component: NavbarComponent},
    {path: 'conge', component: AddcongeComponent},
    {path: 'listconge', component: ListcongeComponent},
    {path: 'profil', component: ProfilComponent},
    {path: 'signin', component: SigninComponent},

    {path: 'salarie', component: AddsalarieComponent},
    {path: 'listsalarie', component: ListsalarieComponent},
    {path: 'typeconge', component: AddtypecongeComponent},
    {path: 'listtypeconge', component: ListtypecongeComponent},
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
  redirectTo: 'home',
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
    ListtypecongeComponent
  ],
  imports: [Ng2SearchPipeModule ,NgxPaginationModule,
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
    ToastrModule.forRoot()
  ],
  exports : MATERIAL_MODULES,
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {}  }, httpInterceptorProviders],
  bootstrap: [AppComponent], 
  entryComponents: [AddsalarieComponent],
  
})
export class AppModule { }
