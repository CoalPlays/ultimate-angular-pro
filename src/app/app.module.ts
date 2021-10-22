import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  PreloadingStrategy,
  Route,
  RouterModule,
  Routes,
} from '@angular/router';

import { MailModule } from './mail/mail.module';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';

export class CustomPreload implements PreloadingStrategy {
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    return route.data && route.data.preload ? fn() : of(null);
  }
}

export const ROUTES: Routes = [
  {
    path: 'dashboard',
    data: { preload: true },
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  { path: '**', redirectTo: 'mail/folder/inbox' },
];

@NgModule({
  declarations: [AppComponent],
  providers: [CustomPreload],
  imports: [
    BrowserModule,
    HttpClientModule,
    MailModule,
    AuthModule,
    RouterModule.forRoot(ROUTES, { preloadingStrategy: CustomPreload }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
