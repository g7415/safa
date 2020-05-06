import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { Salarie } from '../model/salarie';
import { Role } from '../model/role';
import { catchError } from 'rxjs/operators';
const httpOptions = {

  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
// kad ma 3ana controlleurs fe back-end kad ma ana service fe front
//on va declarer les fonctions qui vont faire la communications avec les fonctions eli fe controlleur 
@Injectable({
  providedIn: 'root'
})
export class SalarieService {
  
  private baseUrlEmail = 'http://localhost:8080/testapp/getdetails';
  
  private baseUrl = 'http://localhost:8080/api/sal';
  private baseUrl1 = 'http://localhost:8080/api/salarie';

  private baseUrlRole = 'http://localhost:8080/api/roles';
  choixmenu : number = 1;
  dataForm: any =  FormGroup; 
  listsal:Salarie[];
  listrol:Role[];
  constructor(private http: HttpClient,private toastr: ToastrService,public fb: FormBuilder) { }
  getProfil(username: String): Observable<Salarie> {
    return this.http.get<Salarie>(`${this.baseUrl1}/${username}`);
  }
  getData(id: number): Observable<Object> {
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

  getAll(): Observable<any> {
   
    return this.http.get(`${this.baseUrl}`);
  }

  getAllRoles(): Observable<any> {
   
    return this.http.get(`${this.baseUrlRole}`);
  }

  creatEmail(info:Salarie):Observable<Salarie>{
    return this.http.post<Salarie>(`${this.baseUrlEmail}`, info)
  }
  

  
}
