import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WarrantyService {
  private apUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


    // get all warranty
    getAllWarranty() {
        return this.http.get(`${this.apUrl}/warranty/all`).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }

    // get warranty by id
    getWarrantyById(id: number) {
        return this.http.get(`${this.apUrl}/warranty/${id}`).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }

    // create warranty
    createWarranty(warranty: any) {
        return this.http.post(`${this.apUrl}/warranty/new-warranty`, warranty).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }

    // update warranty
    updateWarranty(id: number, warranty: any) {
        return this.http.put(`${this.apUrl}/warranty/update-warranty/${id}`, warranty).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }

    // filter by status
    filterByStatus(status: string) {
        return this.http.get(`${this.apUrl}/warranty/filter-by-status/${status}`).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }

    // delete warranty
    deleteWarranty(id: number) {
        return this.http.delete(`${this.apUrl}/warranty/delete-warranty/${id}`).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }
}
