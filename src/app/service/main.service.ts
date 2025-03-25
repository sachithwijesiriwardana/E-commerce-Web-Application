import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { APIResponseModel, Cartmodel, Customer, Login } from '../model/Product';
import { Constant } from '../constant/constant';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  apiUrl: string = '/api/BigBasket/';
  onCartAdded: Subject<boolean> = new Subject<boolean>();
  loggedUserData: Customer = new Customer();

  constructor(private http: HttpClient) {
    const isUser = localStorage.getItem(Constant.LOCAL_KEY);
    if (isUser != null) {
      const parseObj = JSON.parse(isUser);
      this.loggedUserData = parseObj;
    }
  }

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

  getCarttProductByCustomerId(
    loggedUserData: number
  ): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(
      `${this.apiUrl}GetCartProductsByCustomerId?id=${loggedUserData}`
    );
  }

  deleteProductFromCartById(cartId: number): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(
      `${this.apiUrl}DeleteProductFromCartById?id=${cartId}`
    );
  }
}
