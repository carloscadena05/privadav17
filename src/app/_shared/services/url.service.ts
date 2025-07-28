import { Injectable } from '@angular/core';
import { URL_CONFIG } from '../../../url-config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, delay, mergeMap, retryWhen } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

export declare type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

@Injectable({ providedIn: 'root' })
export class UrlService {
  webApiPrefix: string;
  staticFilePrefix: string;
  clientUrl: string;


  constructor(
    private http: HttpClient
  ) {
    console.log('urlService constructor has ' + window.location.hostname);
    const hostName = window.location.hostname.toLocaleLowerCase();

    if (hostName === 'privada.jovenesadelante.org') {
      this.webApiPrefix =  URL_CONFIG.ProdUrlPrefix + 'api/'; // 'https://JAWebAPI.jovenesadelante.org/api/';
      this.staticFilePrefix =  URL_CONFIG.ProdUrlPrefix + 'static/';
      this.clientUrl = 'https://' + hostName; // privada.jovenesadelante.org';
    } else if (hostName === 'privada-dev.jovenesadelante.org') {
      this.webApiPrefix =  URL_CONFIG.DevUrlPrefix + 'api/';
      this.staticFilePrefix =  URL_CONFIG.DevUrlPrefix + 'static/';
      this.clientUrl = 'https://' + hostName; // privada-dev.jovenesadelante.org';
    } else if (hostName === 'localhost' || '127.0.0.1' ) {
      this.webApiPrefix = URL_CONFIG.localDevUrlPrefix + 'api/'; // Local  Development
      this.staticFilePrefix = URL_CONFIG.localDevUrlPrefix + 'static/';
      // if above doesn't work, run ipconfig to see current IPv4 address
      // may want to try these at times:
      // this.webApiPrefix =  URL_CONFIG.DevUrlPrefix + 'api/'; // remote dev
      // this.webApiPrefix = URL_CONFIG.ProdUrlPrefix + 'api/'; ; // remote prod
      this.clientUrl = 'http://localhost:3000';
      // this.clientUrl = 'http://127.0.0.1:3000';
      // this.clientUrl = hostName + ':3000';
    }


    console.log('>>>webapi prefix: ' + this.webApiPrefix);
    console.log('>>>clientUrl: ' + this.clientUrl);
  }
  public getWebApiPrefix(): string {
    return this.webApiPrefix;
  }

  public getStaticFilePrefix(): string {
    return this.staticFilePrefix;
  }

  public getClientUrl(): string {
    return this.clientUrl;
  }

  public getClientCallbackUrl(): string {
    return this.clientUrl + '/callback';
  }

  
  async production<T>(method: Method, url: string, options?: {
    body?: any,
    params?: any,
    headers?: any
  }): Promise<T> {
    if (url.includes('/neon/')) {
      options = options || {};
      options.headers = {
        ...options.headers,
        Authorization: "Basic am92ZW5lc2FkZWxhbnRlOjk5MDVlZGMyYTlhZTJlMGQ3MmRjYjU0NmQ1NTg0YWVi"
      };
    }

    const _options: any = {
      body: options?.body,
      params: options?.params,
      headers: new HttpHeaders(options?.headers || {})
    };
    console.log(url, options);
    

    return new Promise<T>((resolve) => {
      this.http.request<T>(method, url, _options).pipe(
        retryWhen(errors =>
          errors.pipe(
            mergeMap((error, i) => {
              const maxRetries = 3;
              const delayMs = 1000;
              if (i < maxRetries) {
                console.warn(`Reintentando (${i + 1}/${maxRetries}) para: ${url}`);
                return of(error).pipe(delay(delayMs));
              }
              console.error(`Fallo definitivo para: ${url}`, error);
              return throwError(() => error);
            })
          )
        ),
        catchError(error => {
          console.error('Error capturado en catchError:', error);
          return of(null);
        })
      ).subscribe((response: any) => {
        resolve(response);
      });
    });
  }
}
