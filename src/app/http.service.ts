import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TProduct } from './Pages/home/home.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  base = 'https://fakestoreapi.com';
  productURL = '/products';
  constructor(
    private _http:HttpClient
  ) {

  }


  GET<T>(url:string):Observable<T>{
    return this._http.get<T>(this.base+url);
  }
  POST<T,K>(url:string,payload:K):Observable<T>{
    return this._http.get<T>(this.base+url);
  }

  getProduct():Observable<TProduct[]>{
    return this.GET<TProduct[]>(this.productURL)
  }

}
