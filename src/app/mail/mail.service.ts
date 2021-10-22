import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Mail } from './models/mail.interface';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class MailService {
  constructor(private http: HttpClient) {}
  getFolder(folder: string): Observable<Mail[]> {
    return this.http
      .get<Mail[]>(`http://localhost:3000/messages?folder=${folder}`)
      .pipe(catchError((error) => of(error)));
  }
  getMessage(id: string): Observable<Mail> {
    return this.http
      .get<Mail[]>(`http://localhost:3000/messages/${id}`)
      .pipe(catchError((error) => of(error)));
  }
}
