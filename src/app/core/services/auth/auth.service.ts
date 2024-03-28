import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";
import {AuthResponse} from "../../../shared/models/response/auth-response.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private apUrl = environment.apiUrl;

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    // login
    login(loginRequest: any) {
        return this.http.post(`${this.apUrl}/auth/login`, loginRequest).pipe(
            map((response :any) => {
                this.saveToLocalStorage(response.data)
                this.saveTokenToLocalStorage(response.data.token);
                return response;
            }),
            catchError((error) => {
                return throwError(error);
            })
        );
    }

    // register
    register(registerRequest: any) {
        return this.http.post(`${this.apUrl}/auth/signup`, registerRequest).pipe(
            map(response => {
                return response;
            }),
            catchError((error) => {
                return throwError(error);
            })
        );
    }

    // clear local storage
    cleanStorage(){
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

    // save user to local storage
    saveToLocalStorage(response: AuthResponse) {
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(response));
    }


    // get user from local storage
    getUser() {
        const user = localStorage.getItem('user');
        if(user != null && user!=''){
            const authResponse:AuthResponse = JSON.parse(user);
            return authResponse;
        }
    }

    // save Token to local storage
    saveTokenToLocalStorage(token: string) {
        localStorage.removeItem('token');
        localStorage.setItem('token',  JSON.stringify(token));
    }

    // get Token from local storage
    getToken() {
        const token = localStorage.getItem('token');
        if(token != null && token!=''){
            return JSON.parse(token);
        }
    }

    // logout
    logout() {
        this.cleanStorage();
        this.router.navigate(['user-management/auth/login']);
    }
}
