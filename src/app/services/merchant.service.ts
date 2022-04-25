import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../providers/config';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';
import { CheckpinService } from "../services/checkpin.service";

@Injectable({
  providedIn: 'root'
})

export class MerchantService {

  constructor(private http: HttpClient, public config: Config, public storage: Storage, private pinService: CheckpinService) { }


  getAirtimeBillers(){
    return this.http.get<any>(`${this.config.api_url}/user/airvend-billers-wallet-balances`);
  }

  async setReward(data) {
    const pin = await this.pinService.runCheck();
    if (pin) {
      return this.http.patch<any>(this.config.api_url + "/user/update-merchant-percentage", data, {
        headers: new HttpHeaders({"pin": pin})
      });
    }
  }


  uploadMerchant( formData: any ) {
    return this.http.post(`${this.config.api_url}/user/submit-merchant`, formData);
  }

  getLogo() {
    return this.http.get<any>(`${this.config.api_url}/user/get-merchant-photo`);
  }

  getData() {
    return this.http.get<any>(`${this.config.api_url}/user/get-merchant-data`);
  }


  register( formData: any ) {
    return this.http.post<any>(`${this.config.api_url}/user/merchant/profile`, formData);
}


}
