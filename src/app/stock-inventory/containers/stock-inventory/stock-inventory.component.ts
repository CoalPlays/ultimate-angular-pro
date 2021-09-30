import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Item, Product } from '../../models/products.interface';
import { StockInventoryService } from '../../services/stock-inventory.service';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';

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
        <stock-products
          [parent]="form"
          [map]="productMap"
          (removed)="removeStock($event)"
        >
        </stock-products>

        <div class="stock-inventory__price">
          Total: {{ total | currency: 'USD':'symbol' }}
        </div>

        <div class="stock-inventory__buttons">
          <button type="submit" [disabled]="form.invalid">Order stock</button>
        </div>
        <pre>{{ form.value | json }}</pre>
      </form>
    </div>
  `,
})
export class StockInventoryComponent implements OnInit {
  products: Product[] | undefined;

  total: number | undefined;

  productMap: Map<number, Product> | undefined;

  form = this.fb.group({
    store: this.fb.group({
      branch: '',
      code: '',
    }),
    selector: this.createStock({ product_id: 10, quantity: 10 }),
    stock: this.fb.array([]),
  });

  constructor(
    private fb: FormBuilder,
    private stockService: StockInventoryService
  ) {}

  ngOnInit() {
    const cart = this.stockService.getCartItems();
    const products = this.stockService.getProducts();
    forkJoin(cart, products).subscribe(
      ([cart, products]: [Item[], Product[]]) => {
        const myMap = products.map<[number, Product]>((product) => [
          product.id,
          product,
        ]);
        this.productMap = new Map<number, Product>(myMap);
        this.products = products;
        cart.forEach((item) => this.addStock(item));
        this.calculateTotal(this.form.get('stock')?.value);
        this.form
          .get('stock')
          ?.valueChanges.subscribe((value) => this.calculateTotal(value));
      }
    );
  }

  calculateTotal(value: Item[]) {
    const total = value.reduce((prev, next) => {
      const product = this.productMap?.get(next.product_id);
      return prev + next.quantity * (product ? product.price : 0);
    }, 0);
    this.total = total;
  }

  createStock(stock: Item) {
    return this.fb.group({
      product_id: stock.product_id || '',
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
