import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponseModel, Cartmodel, Customer, Login } from '../model/Product';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  apiUrl: string = '/api/BigBasket/';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(this.apiUrl + 'GetAllProducts');
  }

  getAllCategory(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(this.apiUrl + 'GetAllCategory');
  }
  getAllCategoryById(categoryId: number): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(
      `${this.apiUrl}GetAllProductsByCategoryId?id=${categoryId}`
    );
  }

  registerCustomer(obj: Customer): Observable<APIResponseModel> {
    const url = `${this.apiUrl}RegisterCustomer`;
    return this.http.post<APIResponseModel>(url, obj);
  }
  login(obj: Login): Observable<APIResponseModel> {
    const url = `${this.apiUrl}login`;
    return this.http.post<APIResponseModel>(url, obj);
  }

  addToCart(obj: Cartmodel): Observable<APIResponseModel> {
    const url = `${this.apiUrl}AddToCart`;
    return this.http.post<APIResponseModel>(url, obj);
  }
}
