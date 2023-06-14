import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyapidataService {
  [x: string]: any;
  private dataSubject = new Subject<any>();
  constructor(private http: HttpClient) { }
  getCurrencyData() {
    const host = 'api.frankfurter.app';

    let keysArray: any = []
    fetch(`https://${host}/currencies`)
      .then((data) => data.json())
      .then((data) => {

        const entries = Object.entries(data);
        keysArray = entries.map(([key, value]) => key);
        console.log(keysArray);
        return this.dataSubject.next(keysArray);
      })

  }

  public getDataObservable() {
    return this.dataSubject.asObservable();
  }

}
