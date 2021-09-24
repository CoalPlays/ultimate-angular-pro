import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { AuthFormComponent } from './auth-form/auth-form.component';

import { User } from './auth-form/auth-form.interface';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <div #entry></div>
    </div>
  `,
})
export class AppComponent implements AfterViewInit {
  @ViewChild('entry', { read: ViewContainerRef }) entry:
    | ViewContainerRef
    | undefined;

  constructor(
    private cd: ChangeDetectorRef,
    private resolver: ComponentFactoryResolver
  ) {}

  ngAfterViewInit() {
    if (this.entry) {
      const authFormFactory =
        this.resolver.resolveComponentFactory(AuthFormComponent);
      const component = this.entry.createComponent(authFormFactory);
      component.instance.title = 'Create Account';
      component.instance.submitted.subscribe(console.log);
      this.cd.detectChanges();
    }
  }

  loginUser(user: User) {
    console.log('Login', user);
  }
}
