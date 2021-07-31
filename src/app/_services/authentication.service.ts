import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private requestHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

    constructor(private http: HttpClient,private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        debugger;
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        debugger;
        return this.http.post<any>(`/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('currentUser', JSON.stringify(user));
               // localStorage.setItem('deviceImage', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }
    authenticateUser(userObject): Observable<any> {
        debugger;
        debugger;
        const headers = { 'content-type': 'application/json'}  
        console.log('authenticateUser');
        var userObj = JSON.stringify(userObject);
        localStorage.setItem('currentUser', userObj);
        const url = 'http://169.57.99.218:30384/login';
      // const url = 'http://localhost:8080/login';
        return this.http.post(url, userObj,{'headers':headers});
    }


    logoutMethod() {
        debugger;
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
         this.router.navigate(['login']);
    }
}