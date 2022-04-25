import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../providers/config';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient, public config: Config, public storage: Storage) { }


  getLoanInformation() {
    return this.http.get<any>(`${this.config.api_url}/user/benefits`);
  }
}
