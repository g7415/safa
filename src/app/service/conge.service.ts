import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Conge } from '../model/conge';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CongeService {
  
  private conCommentaire = 'http://localhost:8080/api/conCommentaire';
  private statEnAttente= 'http://localhost:8080/api/statEnAttente';
  private statRefuser = 'http://localhost:8080/api/statRefuser';
  private statAccepter = 'http://localhost:8080/api/statAccepter';
  private resumeConge = 'http://localhost:8080/api/SumCongePris';
  private baseUrlConByManager = 'http://localhost:8080/api/ConByManager';
  private EmaildemandeAccepter = 'http://localhost:8080/testapp/EmaildemandeAccepter';
  private EmaildemandeRefuser = 'http://localhost:8080/testapp/EmaildemandeRefuser';
  private baseUrlconAccep = 'http://localhost:8080/api/conAccep';
  private baseUrlconRefuser = 'http://localhost:8080/api/conRefuser';
  private baseUrlUsernameSal = 'http://localhost:8080/api/conusername';
  private baseUrlIdSal = 'http://localhost:8080/api/conid';
  private baseUrl = 'http://localhost:8080/api/con';
  private baseUrlListConByStatut = 'http://localhost:8080/api/conStatut';

  
  choixmenu : number = 1;
  dataForm: any =  FormGroup; 
  listcon:Conge[];
  private _refresh$ = new Subject();
  constructor(private http: HttpClient,private toastr: ToastrService,public fb: FormBuilder) { }

  AjouterCommentaire(num: number,id:number, value: any): Observable<Object> {
    return this.http.put(`${this.conCommentaire}/${num}/${id}`, value);
  }
  getRefresh()
  {
    return this._refresh$;
  }
  getStatistiqueNbConEnAttente(): Observable<any> {
    return this.http.get(`${this.statEnAttente}`).pipe(
     tap(() => {
       this._refresh$.next();
     })
   );
}
  getStatistiqueNbConRefu(): Observable<any> {
    return this.http.get(`${this.statRefuser}`).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  getStatistiqueNbConAcc(): Observable<any> {
       return this.http.get(`${this.statAccepter}`).pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }
  getSumCongePris(username: String): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    return this.http.get<any>(`${this.resumeConge}/${username}`,{headers});
  }
  getListConByStatut(): Observable<any> {
    return this.http.get(`${this.baseUrlListConByStatut}`);
  }

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
    const headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    return this.http.get(`${this.baseUrl}/${num}`,{headers});
  }

  getCongeByUsernameSal(username: string): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${this.baseUrlUsernameSal}/${username}`);
  }
  getCongeByIdSal(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrlIdSal}/${id}`);
  }
  // createData(info: Conge): Observable<Conge> {
  //   return this.http.post<Conge>(`${this.baseUrl}`, info);
  // }
  createData(info: Conge,id:number): Observable<Conge> {
    const headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    return this.http.post<Conge>(`${this.baseUrl}/${id}`, info,{headers});
  }
  updatedata(num: number,id:number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${num}/${id}`, value);
  }
  // updatedata(num: number, value: any): Observable<Object> {
  //   return this.http.put(`${this.baseUrl}/${num}`, value);
  // }
  
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
