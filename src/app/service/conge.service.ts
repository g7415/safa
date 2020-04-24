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

  private baseUrl = 'http://localhost:8080/api/con';
  choixmenu : number = 1;
  dataForm: any =  FormGroup; 
  listcon:Conge[];
  constructor(private http: HttpClient,private toastr: ToastrService,public fb: FormBuilder) { }

  getData(num: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${num}`);
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
}
