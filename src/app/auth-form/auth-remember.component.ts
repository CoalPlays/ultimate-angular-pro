import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'auth-remember',
  template: `
    <label>
      <input type="checkbox" #checkbox (change)="onChecked(checkbox.checked)" />
      Keep me logged in
    </label>
  `,
})
export class AuthRememberComponent {
  @Output()
  checked: EventEmitter<boolean> = new EventEmitter<boolean>();

  onChecked(checked: boolean) {
    this.checked.emit(checked);
  }
}
