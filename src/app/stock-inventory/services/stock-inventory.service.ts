import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Item, Product } from '../models/products.interface';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StockInventoryService {
  constructor(private http: HttpClient) {}
  getCartItems(): Observable<Item[]> {
    return this.http
      .get<Item[]>('http://localhost:3000/cart')
      .pipe(catchError((error) => of(error)));
  }
  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>('http://localhost:3000/products')
      .pipe(catchError((error) => of(error)));
  }
}
