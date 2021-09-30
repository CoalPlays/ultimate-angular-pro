import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class StockInventoryService {
  constructor(private http: HttpClient) {}
  getCartItems() {
    // return this.http
    //   .get('/api/cart')
    //   .map((response: Response) => response.json())
    //   .catch((error: any) => Observable.throw(error.json));
  }
}
