import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponseModel } from '../model/Product';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  apiUrl: string = '/api/BigBasket/';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(this.apiUrl + 'GetAllProducts');
  }
}
