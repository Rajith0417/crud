import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EmployerModel } from '../components/employer/employer.modal';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postEmpolyer(data: EmployerModel){
    return this.http.post<EmployerModel>("http://localhost:3000/employer", data)
    .pipe(map((res:any)=>{
      return res;
    }));
  }

  getEmpolyer(){
    return this.http.get<EmployerModel>("http://localhost:3000/employer")
    .pipe(map((res:any)=>{
      return res;
    }));
  }

  updateEmpolyer(id: number, data: any){
    return this.http.put<any>("http://localhost:3000/employer/"+id, data)
    .pipe(map((res:any)=>{
      return res;
    }));
  }

  deleteEmpolyer(id: number){
    return this.http.delete<EmployerModel>("http://localhost:3000/employer/"+id)
    .pipe(map((res:any)=>{
      return res;
    }));
  }

}
