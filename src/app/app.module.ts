import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AuthFormModule } from './auth-form/auth-form.module';

import { AppComponent } from './app.component';
import { CreditCardDirective } from './credit-card/credit-card.directive';
import { StockInventoryModule } from './stock-inventory/stock-inventory.module';

@NgModule({
  declarations: [AppComponent, CreditCardDirective],
  imports: [BrowserModule, AuthFormModule, StockInventoryModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
