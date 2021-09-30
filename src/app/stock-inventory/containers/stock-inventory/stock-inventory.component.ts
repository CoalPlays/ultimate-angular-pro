import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { Product } from '../../models/products.interface';

@Component({
  selector: 'stock-inventory',
  styleUrls: ['stock-inventory.component.scss'],
  template: `
    <div class="stock-inventory">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <stock-branch [parent]="form"> </stock-branch>
        <stock-selector
          [parent]="form"
          [products]="products"
          (added)="addStock($event)"
        >
        </stock-selector>
        <stock-products [parent]="form" (removed)="removeStock($event)">
        </stock-products>
        <div class="stock-inventory__buttons">
          <button type="submit" [disabled]="form.invalid">Order stock</button>
        </div>
        <pre>{{ form.value | json }}</pre>
      </form>
    </div>
  `,
})
export class StockInventoryComponent {
  products: Product[] | undefined;

  form = this.fb.group({
    store: this.fb.group({
      branch: '',
      code: '',
    }),
    selector: this.createStock({}),
    stock: this.fb.array([]),
  });

  constructor(private fb: FormBuilder) {}
  createStock(stock: any) {
    return this.fb.group({
      product_id: parseInt(stock.product_id, 10) || '',
      quantity: stock.quantity || 10,
    });
  }

  addStock(stock: any) {
    const control = this.form.get('stock') as FormArray;
    control.push(this.createStock(stock));
  }

  removeStock({ item, index }: { item: FormGroup; index: number }) {
    const control = this.form.get('stock') as FormArray;
    control.removeAt(index);
  }

  onSubmit() {
    console.log('Submit:', this.form.value);
  }
}
