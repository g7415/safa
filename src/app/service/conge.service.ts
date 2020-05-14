import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Conge } from '../model/conge';

@Injectable({
  providedIn: 'root'
})
export class CongeService {
  
  private baseUrlConByManager = 'http://localhost:8080/api/ConByManager';
  private EmaildemandeAccepter = 'http://localhost:8080/testapp/EmaildemandeAccepter';
  private EmaildemandeRefuser = 'http://localhost:8080/testapp/EmaildemandeRefuser';
  private baseUrlconAccep = 'http://localhost:8080/api/conAccep';
  private baseUrlconRefuser = 'http://localhost:8080/api/conRefuser';
  private baseUrlUsernameSal = 'http://localhost:8080/api/conusername';
  private baseUrlIdSal = 'http://localhost:8080/api/conid';
  private baseUrl = 'http://localhost:8080/api/con';
  choixmenu : number = 1;
  dataForm: any =  FormGroup; 
  listcon:Conge[];
  constructor(private http: HttpClient,private toastr: ToastrService,public fb: FormBuilder) { }


  getConByManager(id: number): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${this.baseUrlConByManager}/${id}`);
  }
  creatEmail3(info:Conge):Observable<Conge>{
    return this.http.post<Conge>(`${this.EmaildemandeRefuser}`, info)
  }
  creatEmail2(info:Conge):Observable<Conge>{
    return this.http.post<Conge>(`${this.EmaildemandeAccepter}`, info)
  }
  getData(num: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${num}`);
  }

  getCongeByUsernameSal(username: string): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${this.baseUrlUsernameSal}/${username}`);
  }
  getCongeByIdSal(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrlIdSal}/${id}`);
  }
  createData(info: Conge): Observable<Conge> {
    return this.http.post<Conge>(`${this.baseUrl}`, info);
  }
  updatedata(num: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${num}`, value);
  }
  
  deleteData(num: number): Observable<any> {
   
    return this.http.delete(`${this.baseUrl}/${num}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
   
    return this.http.get(`${this.baseUrl}`);
  }

  updateCongAccep(num: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrlconAccep}/${num}`, value);
  }

  updateCongRefuser(num: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrlconRefuser}/${num}`, value);
  }
}
