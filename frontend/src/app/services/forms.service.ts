import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FormsService {
  public clearForm$ = new Subject<boolean>();

  constructor() { }

  public resetForm(): Observable<boolean> {
    return this.clearForm$.asObservable();
  }
}
