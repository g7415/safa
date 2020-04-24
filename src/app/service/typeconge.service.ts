import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Conge } from '../model/conge';
import { TypeConge } from '../model/typeconge';

@Injectable({
  providedIn: 'root'
})
export class TypecongeService {
  private baseUrl = 'http://localhost:8080/api/typecon';
  choixmenu : number = 1;
  dataForm: any =  FormGroup; 
  listtypecon:TypeConge[];
  
  constructor(private http: HttpClient,private toastr: ToastrService,public fb: FormBuilder) { }

  getData(id_type: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id_type}`);
  }
 
  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, info);
  }
  updatedata(id_type: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id_type}`, value);
  }
  

  deleteData(id_type: number): Observable<any> {
   
    return this.http.delete(`${this.baseUrl}/${id_type}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
   
    return this.http.get(`${this.baseUrl}`);
  }
}