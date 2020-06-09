import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Observable, throwError, Subject } from 'rxjs';
import { Salarie } from '../model/salarie';
import { Role } from '../model/role';
import { catchError, tap } from 'rxjs/operators';
const httpOptions = {

  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
// kad ma 3ana controlleurs fe back-end kad ma ana service fe front
//on va declarer les fonctions qui vont faire la communications avec les fonctions eli fe controlleur 
@Injectable({
  providedIn: 'root'
})
export class SalarieService {
  
  private resetPassword = 'http://localhost:8080/api/auth/resetPassword';
  private changeProfil = 'http://localhost:8080/api/updateProfil';
  private changePassword = 'http://localhost:8080/api/changePassword';
  private baseUrlEmail = 'http://localhost:8080/testapp/getdetails';
  private baseUrlM = 'http://localhost:8080/api/manager';
  private baseUrl = 'http://localhost:8080/api/sal';
  private baseUrl1 = 'http://localhost:8080/api/salarie';
  private EmailresetPassword = 'http://localhost:8080/api/auth/resetPassword';
  private baseUrlRole = 'http://localhost:8080/api/roles';
  private statistique = 'http://localhost:8080/api/dateEntree';
  
  choixmenu : number = 1;
  dataForm: any =  FormGroup; 
  listsal:Salarie[];
  listrol:Role[];
  managerList:Salarie[];
  listMan: any;
  private _refresh$ = new Subject();
  constructor(private http: HttpClient,private toastr: ToastrService,public fb: FormBuilder) { }
  getStatistique1(date_entree: String): Observable<any> {
    return this.http.get(`${this.statistique}/${date_entree}`).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  
  getRefresh()
  {
    return this._refresh$;
  }

  reinitialiseMdp(username: String, value: any): Observable<Salarie> {
    return this.http.put<Salarie>(`${this.resetPassword}/${username}`, value);
  }
  updateProfil(id: number, value: any): Observable<Salarie> {
    return this.http.put<Salarie>(`${this.changeProfil}/${id}`, value);
  }
  updatePassword(username: String, value: any): Observable<Salarie> {
    return this.http.put<Salarie>(`${this.changePassword}/${username}`, value);
  }
  getProfil(username: String): Observable<Salarie> {
    return this.http.get<Salarie>(`${this.baseUrl1}/${username}`);
  }
  getData(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
 
 createData(info: Object): Observable<Object> {
   return this.http.post(`${this.baseUrl}`, info);
 }
 
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error || "Server Error");
  }

  deleteData(id: number): Observable<any> {
   
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
  getAllManager(): Observable<any> {
   
    return this.http.get(`${this.baseUrlM}`);
  }
  getAll(): Observable<any> {
   
    return this.http.get(`${this.baseUrl}`);
  }

  getAllRoles(): Observable<any> {
   
    return this.http.get(`${this.baseUrlRole}`);
  }

  creatEmail(info:Salarie):Observable<Salarie>{
    return this.http.post<Salarie>(`${this.baseUrlEmail}`, info)
  }
  EmailresetPassword1(info:Salarie):Observable<Salarie>{
    return this.http.post<Salarie>(`${this.EmailresetPassword}`, info).pipe(catchError(this.errorHandler));
  }
  
  getFiles(): Observable<any> {
    return this.http.get('http://localhost:8080/api/file/all');
  }
 
  
}
