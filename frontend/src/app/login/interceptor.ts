import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import { AuthService } from '../services/auth.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Clone the request to add the new header.
    const authReq = req.clone({ headers: req.headers
        .set('Authorization', (localStorage.getItem('Authorization') ? `Bearer ${localStorage.getItem('Authorization')}` : ''))
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Headers', '*')
    });

    // send the newly created request
    return next.handle(authReq)
        .catch((error, caught) => {

            // intercept the respons error and displace it to the console
            console.log('Error Occurred', error);

            // return the error to the method that called it
            return Observable.throw(error);
        }) as any;
    }
}

// https://www.intertech.com/Blog/angular-4-tutorial-handling-refresh-token-with-new-httpinterceptor/
