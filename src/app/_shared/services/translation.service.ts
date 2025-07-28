import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class TranslationService {
  xlateEndpoint: string;
  azureKey1: string;
  azureKey2: string;

  constructor(private http: HttpClient) {
    // console.log('data service constructor');
    this.xlateEndpoint = 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0';
    this.azureKey1 = '7a6a2fee9e1d44f69a0808557fa06207';
    this.azureKey2 = '1d1a0b9335004a6d843aaafb053c8569';
  }


  public translateFromSpanish(textIn: string): Observable<any> {
    const url = this.xlateEndpoint + '/translate';
    console.log('in TranslationService translateFromSpanish');
    let body = JSON.stringify({ textIn: textIn });
    // strip outer key name
    const x = JSON.parse(body);
    body = JSON.stringify(x.followUpEvent);
    console.log('and final body ' + body);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers.append('Ocp-Apim-Subscription-Key', this.azureKey1);
    console.log('ready to post ' + url + ' body: ' + body + ' options ' + headers);
    const result = this.http.post(url, body, { headers: headers });
    console.log(result);
    return result;
  }

  /// ///////////////////////////////////////////////
  /// Utilities
  /// ///////////////////////////////////////////////


  // private extractData(res: Response) {
  //   console.log('data service extractData');
  //   const body = res.json();
  //   return body.data || { };
  // }

/*   private handleError(error: any) {
    console.log('data service handle error');
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(errMsg.message);
    console.log(errMsg.statusText);
    console.error(errMsg); // log to console instead
    if (errMsg === 'No JWT present or has expired') {
      window.alert('Session has expired, please log in again.');
    }
    return throwError(errMsg);
  } */
}
