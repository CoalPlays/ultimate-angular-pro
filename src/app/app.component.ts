import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  TemplateRef,
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
      <ng-container
        [ngTemplateOutlet]="tmpl"
        [ngTemplateOutletContext]="ctx"
      ></ng-container>
      <ng-template #tmpl let-name let-mood="mood"
        >{{ name }} ist {{ mood }}</ng-template
      >
    </div>
  `,
})
export class AppComponent implements AfterViewInit {
  component: ComponentRef<AuthFormComponent> | undefined;
  ctx = {
    $implicit: 'Elias',
    mood: 'happy',
  };

  @ViewChild('entry', { read: ViewContainerRef }) entry:
    | ViewContainerRef
    | undefined;

  @ViewChild('tmpl') tmpl: TemplateRef<any> | undefined;

  constructor(
    private cd: ChangeDetectorRef,
    private resolver: ComponentFactoryResolver
  ) {}

  ngAfterViewInit() {
    if (this.entry && this.tmpl) {
      const authFormFactory =
        this.resolver.resolveComponentFactory(AuthFormComponent);

      this.component = this.entry.createComponent(authFormFactory, 0);
      this.component.instance.title = 'Create Account';
      this.component.instance.submitted.subscribe(this.loginUser);
      this.cd.detectChanges();
    }
  }

  loginUser(user: User) {
    console.log('Login', user);
  }

  destroyComponent() {
    this.component?.destroy();
  }
  moveComponent() {
    if (this.component) {
      this.entry?.move(this.component.hostView, 1);
    }
  }
}
