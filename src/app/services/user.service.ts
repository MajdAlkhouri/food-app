import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL, } from '../shared/constants/urls';
import { IUserLogin } from '../shared/interfaces/IUserLogin';

import { User } from '../shared/models/User';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject =
  new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;
  constructor(private http:HttpClient, private toastrService:ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser():User{
    return this.userSubject.value;
  }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) =>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Foodmine ${user.name}!`,
            'Login Successful'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed');
        }
      })
    );
  }

  
  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY); // user key soll weg sein
    window.location.reload(); // refresh the page
  }

  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user)); // set the key 
  }

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY); // get the key
    if(userJson) return JSON.parse(userJson) as User;   // JSON. parse rekonstruiert eigenständig einen JavaScript-Wert aus dem übergebenen JSON-String. Dabei werden Array- und Objektliterale, Zahlen, boolesche Werte und null automatisch konvertiert.
   // جسون. يعيد التحليل بشكل مستقل بناء قيمة JavaScript من سلسلة JSON التي تم تمريرها. يتم تحويل القيم الحرفية للصفيف والكائن والأرقام والقيم المنطقية والقيم الخالية تلقائيًا.
  
    return new User();
  }
}

