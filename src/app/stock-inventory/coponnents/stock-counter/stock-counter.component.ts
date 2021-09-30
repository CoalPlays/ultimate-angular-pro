import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { of, throwError } from 'rxjs';

const COUNTER_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StockCounterComponent),
  multi: true,
};

@Component({
  selector: 'stock-counter',
  providers: [COUNTER_CONTROL_ACCESSOR],
  template: `
    <div>
      <div>
        <div>
          <p>{{ value }}</p>
          <div>
            <button
              type="button"
              (click)="increment()"
              [disabled]="value === max"
            >
              +
            </button>
            <button
              type="button"
              (click)="decrement()"
              [disabled]="value === min"
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class StockCounterComponent implements ControlValueAccessor {
  private onTouch: Function | undefined;
  private onModelChange: Function | undefined;

  registerOnChange(fn: any) {
    this.onModelChange = fn;
  }

  writeValue(value: any) {
    this.value = value || 0;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  @Input() step: number = 10;
  @Input() min: number = 10;
  @Input() max: number = 1000;

  value: number = 10;

  // onKeyDown(event: KeyboardEvent){
  //   const handlers =  {
  //     ArrowDown:  () => this.decrement(),
  //     ArrowUp: () => this.increment(),
  //   };
  //   if(handlers?[event.code]){
  //     handlers? handlers[event.code] : console.log("wrong");
  //     event.preventDefault();
  //     event.stopPropagation();string
  //   }
  //     this.onTouch
  // }

  increment() {
    if (this.value < this.max) {
      this.value = this.value + this.step;
      this.onModelChange
        ? this.onModelChange(this.value)
        : throwError((error: any) => of(error));
    }
    this.onTouch ? this.onTouch() : throwError((error: any) => of(error));
  }
  decrement() {
    if (this.value > this.min) {
      this.value = this.value - this.step;
      this.onModelChange
        ? this.onModelChange(this.value)
        : throwError((error: any) => of(error));
    }
    this.onTouch ? this.onTouch() : throwError((error: any) => of(error));
  }
}
