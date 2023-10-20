import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLoginDetails } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  constructor(
    private http: HttpClient
  ) { }

  registerUser(userDetails: any): Observable<any>{
    const options= new HttpHeaders({'content-type':'application/json'})
    return this.http.post("http://localhost:5000/api/register",userDetails,{headers:options})
  }

  loginUser(userDetails: UserLoginDetails): Observable<any>{
    const options= new HttpHeaders({'content-type':'application/json'})
    return this.http.post("http://localhost:5000/api/login",userDetails,{headers:options})
  }

  getAllUsers(): Observable<any>{
    console.log("get all users")
    const options= new HttpHeaders({'content-type':'application/json'})
    return this.http.get("http://localhost:5000/api/getAllUsers",{headers:options})
  }

}
