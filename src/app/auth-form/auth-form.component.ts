import {
  Component,
  Output,
  EventEmitter,
  AfterContentInit,
  ContentChild,
  ContentChildren,
  QueryList,
  AfterViewInit,
  ViewChild,
  ViewChildren,
  ChangeDetectorRef,
  ElementRef,
  Renderer2,
} from '@angular/core';

import { User } from './auth-form.interface';
import { AuthRememberComponent } from './auth-remember.component';
import { AuthMessageComponent } from './auth-message.component';

@Component({
  selector: 'auth-form',

  template: `
    <div>
      <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
        <ng-content></ng-content>
        <h3>{{ title }}</h3>
        <label>
          Email address
          <input type="email" name="email" ngModel />
        </label>
        <label>
          Password
          <input type="password" name="password" ngModel />
        </label>
        <button type="submit">{{ title }}</button>
      </form>
    </div>
  `,
})
export class AuthFormComponent {
  title: string = 'login';
  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();
  onSubmit(value: User) {
    this.submitted.emit(value);
  }
}
