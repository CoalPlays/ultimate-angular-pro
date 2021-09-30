import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { mainDiagnosticsForTest } from '@angular/compiler-cli/src/main';
import { Product } from '../../models/products.interface';

@Component({
  selector: 'stock-products',
  styleUrls: ['stock-products.component.scss'],
  template: `
    <div *ngIf="parent" [formGroup]="parent">
      <div formArrayName="stock">
        <div *ngFor="let prod of stocks; let i = index">
          <div [formGroupName]="i">
            <div class="stock-product__name">
              {{ getProduct(prod.value.product_id)?.name }}
            </div>
            <div class="stock-product__price">
              {{
                getProduct(prod.value.product_id)?.price
                  | currency: 'USD':'symbol'
              }}
            </div>
            <input
              type="number"
              formControlName="quantity"
              placeholder="Menge"
              step="10"
              min="10"
              max="10000"
            />
            <button type="button" (click)="onRemove(prod, i)">Löschen</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class StockProductsComponent {
  @Input()
  parent: FormGroup | undefined;
  get stocks() {
    return (this.parent?.get('stock') as FormArray).controls;
  }

  @Input()
  map: Map<number, Product> | undefined;

  @Output()
  removed: EventEmitter<any> = new EventEmitter<any>();

  getProduct(id: number) {
    return this.map?.get(id);
  }

  onRemove(item: any, index: number) {
    this.removed.emit({ item, index });
  }
}
