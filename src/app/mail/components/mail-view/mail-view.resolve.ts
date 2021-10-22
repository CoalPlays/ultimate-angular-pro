import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Mail } from '../../models/mail.interface';
import { Observable } from 'rxjs';
import { MailService } from '../../mail.service';

@Injectable()
export class MailViewResolve implements Resolve<Mail> {
  constructor(private mailService: MailService) {}
  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Mail> | Promise<Mail> | Mail {
    return this.mailService.getMessage(route.params.id);
  }
}
