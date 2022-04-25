import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../providers/config';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MerchantManagementService {

  constructor(private http: HttpClient, public config: Config, public storage: Storage) { }


  addService( formData: any ){
    return this.http.post(`${this.config.api_url}/user/add-merchant-service`, formData);
  }

  removeService( id:number ) {
    return this.http.delete(`${this.config.api_url}/user/delete-merchant/${id}`);
  }


  uploadMerchant( formData: any ) {
    return this.http.post(`${this.config.api_url}/user/submit-merchant`, formData);
  }

  getLogo() {
    return this.http.get<any>(`${this.config.api_url}/user/get-merchant-photo`);
  }

  getMerchantServices() {
    return this.http.get<any>(`${this.config.api_url}/user/get-merchant-services`);
  }

  getMerchantAbout() {
    return this.http.get<any>(`${this.config.api_url}/user/get-merchant-about`);
  }


  register( formData: any ) {
    return this.http.post(`${this.config.api_url}/user/submit-merchant`, formData);
}


}
