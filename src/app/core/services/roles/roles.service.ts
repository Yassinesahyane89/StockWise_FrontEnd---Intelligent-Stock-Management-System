import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RolesService {
    private apUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    // get all roles
    getAllRoles() {
        return this.http.get(`${this.apUrl}/role/all`).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }

    // get role by id
    getRoleById(id: number) {
        return this.http.get(`${this.apUrl}/role/${id}`).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }

    // create role
    createRole(role: any) {
        return this.http.post(`${this.apUrl}/role/new-role`, role).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }

    // update role
    updateRole(id: number, role: any) {
        return this.http.put(`${this.apUrl}/role/update-role/${id}`, role).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }

    // delete role
    deleteRole(id: number) {
        return this.http.delete(`${this.apUrl}/role/delete-role/${id}`).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }

    // init form
    initForm() {
        return this.http.get(`${this.apUrl}/role/permissions`).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }
}
