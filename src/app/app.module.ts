import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AuthFormModule } from './auth-form/auth-form.module';

import { AppComponent } from './app.component';
import { CreditCardDirective } from './credit-card/credit-card.directive';

@NgModule({
  declarations: [AppComponent, CreditCardDirective],
  imports: [BrowserModule, AuthFormModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
