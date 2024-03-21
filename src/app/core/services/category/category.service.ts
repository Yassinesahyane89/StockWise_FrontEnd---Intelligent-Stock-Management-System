import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    private apUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    // get all category
    getCategories() {
        return this.http.get(`${this.apUrl}/category/all`).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }

    // get category by id
    getCategoryById(id: number) {
        return this.http.get(`${this.apUrl}/category/${id}`).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }

    // create category
    createCategory(category: any) {
        return this.http.post(`${this.apUrl}/category/new-category`, category).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }

    // update category
    updateCategory(id: number, category: any) {
        return this.http.put(`${this.apUrl}/category/update-category/${id}`, category).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }

    // delete category
    deleteCategory(id: number) {
        return this.http.delete(`${this.apUrl}/category/delete-category/${id}`).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }
}
