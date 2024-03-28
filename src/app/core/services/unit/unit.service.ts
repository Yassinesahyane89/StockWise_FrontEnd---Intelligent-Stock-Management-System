import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  private apUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

    // get all units
    getAllUnits() {
        return this.http.get(`${this.apUrl}/unit/all`).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }

    // get unit by id
    getUnitById(id: number) {
        return this.http.get(`${this.apUrl}/unit/${id}`).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }

    // create unit
    createUnit(unit: any) {
        return this.http.post(`${this.apUrl}/unit/new-unit`, unit).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }

    // update unit
    updateUnit(id: number, unit: any) {
        return this.http.put(`${this.apUrl}/unit/update-unit/${id}`, unit).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }

    // filter unit by status
    filterByStatus(status: string) {
        return this.http.get(`${this.apUrl}/unit/filter-by-status/${status}`).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }

    // delete unit
    deleteUnit(id: number) {
        return this.http.delete(`${this.apUrl}/unit/delete-unit/${id}`).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }
}
