import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Mail } from '../../models/mail.interface';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'mail-view',
  styleUrls: ['mail-view.component.scss'],
  template: `
    <div class="mail-view">
      <h2>{{ (message | async)?.from }}</h2>
      <p>{{ (message | async)?.summary }}</p>
    </div>
    <div>
      <textarea
        #text
        (change)="updateReply(text.value)"
        placeholder="Type your reply..."
        [value]="reply"
      ></textarea>
      <button type="button" (click)="sendReply()">send</button>
    </div>
  `,
})
export class MailViewComponent implements OnInit {
  reply = '';
  hasUsavedChanges = false;
  message: Observable<Mail> = this.route.data.pipe(pluck('message'));
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.params.subscribe(() => {
      this.reply = '';
      this.hasUsavedChanges = false;
    });
  }
  updateReply(value: string) {
    if (value) {
      this.reply = value;
      this.hasUsavedChanges = true;
    }
  }
  sendReply() {
    console.log('Sent! ', this.reply);
    this.hasUsavedChanges = false;
  }
}
