import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

    // get all user
    getUsers() : Observable<any> {
        return this.http.get(`${this.apUrl}/user/all`).pipe(
            catchError((error) => {
              // Handle the error and optionally log it
              console.error('API Error:', error);
              return throwError('Error getting user');
            })
        );
    }

    // get user by id
    getUser(id: number) : Observable<any> {
        return this.http.get(`${this.apUrl}/user/${id}`).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }

    // create user
    createUser(user: any) : Observable<any> {
        return this.http.post(`${this.apUrl}/user/new-user`, user).pipe(
            catchError((error) => {
              // Handle the error and optionally log it
              return throwError(error);
            })
        );
    }

    // update user
    updateUser(id: number, user: any) : Observable<any> {
        return this.http.put(`${this.apUrl}/user/update-user/${id}`, user).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }

    // delete user
    deleteUser(id: number) : Observable<any> {
        return this.http.delete(`${this.apUrl}/user/delete-user/${id}`).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }
}
