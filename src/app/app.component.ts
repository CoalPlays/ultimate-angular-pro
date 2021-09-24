import { Component, OnInit } from '@angular/core';

import { AuthFormComponent } from './auth-form/auth-form.component';

import { User } from './auth-form/auth-form.interface';

interface File {
  name: string;
  size: any;
  type: string;
}

@Component({
  selector: 'app-root',
  template: `
    <div>
      <stock-inventory></stock-inventory>
    </div>
  `,
})
export class AppComponent {}
