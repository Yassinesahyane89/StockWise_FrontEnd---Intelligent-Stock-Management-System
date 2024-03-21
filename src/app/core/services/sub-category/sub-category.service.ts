import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  private apUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // get all sub-categories
  getAllSubCategories() {
    return this.http.get(`${this.apUrl}/sub-category/all`).pipe(
        catchError((error) => {
          return throwError(error);
        })
    );
  }

  // get sub-category by id
  getSubCategoryById(id: number) {
    return this.http.get(`${this.apUrl}/sub-category/${id}`).pipe(
        catchError((error) => {
          return throwError(error);
        })
    );
  }

    // get sub-category by category id
    getSubCategoryByCategoryId(id: number) {
        return this.http.get(`${this.apUrl}/sub-category/category/${id}`).pipe(
            catchError((error) => {
            return throwError(error);
            })
        );
    }

  // create sub-category
  createSubCategory(subCategory: any) {
    return this.http.post(`${this.apUrl}/sub-category/new-sub-category`, subCategory).pipe(
        catchError((error) => {
          return throwError(error);
        })
    );
  }

  // update sub-category
  updateSubCategory(id: number, subCategory: any) {
    return this.http.put(`${this.apUrl}/sub-category/update-sub-category/${id}`, subCategory).pipe(
        catchError((error) => {
          return throwError(error);
        })
    );
  }

  // delete sub-category
  deleteSubCategory(id: number) {
    return this.http.delete(`${this.apUrl}/sub-category/delete-sub-category/${id}`).pipe(
        catchError((error) => {
          return throwError(error);
        })
    );
  }
}
