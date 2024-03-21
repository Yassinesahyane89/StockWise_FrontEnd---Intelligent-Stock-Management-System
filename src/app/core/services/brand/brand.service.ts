import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private apUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

    // get all brand
    getBrands() {
        return this.http.get(`${this.apUrl}/brand/all`).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }

    // get brand by id
    getBrandById(id: number) {
        return this.http.get(`${this.apUrl}/brand/${id}`).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }

    // create brand
    createBrand(brand: any) {
        return this.http.post(`${this.apUrl}/brand/new-brand`, brand).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }

    // update brand
    updateBrand(id: number, brand: any) {
        return this.http.put(`${this.apUrl}/brand/update-brand/${id}`, brand).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }

    // delete brand
    deleteBrand(id: number) {
        return this.http.delete(`${this.apUrl}/brand/delete-brand/${id}`).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }
}
