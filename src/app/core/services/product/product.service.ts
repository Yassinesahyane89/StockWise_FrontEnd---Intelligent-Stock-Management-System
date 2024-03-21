import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    private apUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    // get all product
    getProducts() {
        return this.http.get(`${this.apUrl}/product/all`).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }

    // get product by id
    getProductById(id: number) {
        return this.http.get(`${this.apUrl}/product/${id}`).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }

    // create product
    createProduct(product: any) {
        return this.http.post(`${this.apUrl}/product/new-product`, product).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }

    // update product
    updateProduct(id: number, product: any) {
        return this.http.put(`${this.apUrl}/product/update-product/${id}`, product).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }

    // delete product
    deleteProduct(id: number) {
        return this.http.delete(`${this.apUrl}/product/delete-product/${id}`).pipe(
            catchError((error) => {
              return throwError(error);
            })
        );
    }
}
