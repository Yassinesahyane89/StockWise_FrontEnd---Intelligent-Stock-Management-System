import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

    private apUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    // update profile
    updateProfile(user: any, id: number) {
        return this.http.put(`${this.apUrl}/profile/update-profile/${id}`, user).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }


    // update password
    updatePassword(user: any,id: number) {
        return this.http.put(`${this.apUrl}/profile/update-password/${id}`, user).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }
}
