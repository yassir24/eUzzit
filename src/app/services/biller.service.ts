import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Config } from "../providers/config";
import { Storage } from "@ionic/storage";
import { CheckpinService } from "./checkpin.service";

@Injectable({
  providedIn: "root",
})
export class BillerService {
  constructor(
    private http: HttpClient,
    public config: Config,
    public storage: Storage,
    public pinService: CheckpinService
  ) {}

  getInternetBillers() {
    return this.http.get<any>(
      `${this.config.api_url}/user/services/databundle/providers`
    );
  }

  getInternetBundles(service_id: any) {
    return this.http.post<any>(
      `${this.config.api_url}/user/services/databundle/products`,
      { service_id: service_id }
    );
  }

  async internetRecharge(type, name, formData: any) {
    const pin = await this.pinService.runCheck(type, name, formData);
    if (pin) {
      return this.http
        .post<any>(
          `${this.config.api_url}/user/services/databundle/purchase`,
          formData,
          {
            headers: new HttpHeaders({ pin: pin }),
          }
        )
        .toPromise();
    }
  }

  async recharge(type, name?, data?, p?) {
    const pin = await this.pinService.runCheck(type, name, p);
    if (pin) {
      return this.http
        .post<any>(
          `${this.config.api_url}/user/services/airtime/purchase`,
          data,
          {
            headers: new HttpHeaders({ pin: pin }),
          }
        )
        .toPromise();
    }
  }

  getAVAirtimeBillers() {
    return this.http.get<any>(`${this.config.api_url}/user/airvend-billers-wallet-balances`);
  }

  getAirtimeBillers() {
    return this.http.get<any>(
      `${this.config.api_url}/user/services/airtime/providers`
    );
  }

  ISrecharge(formdata: any) {
    return this.http.post<any>(
      `${this.config.api_url}/user/interswitch-recharge-user`,
      formdata
    );
  }

  ISInternetRecharge(formdata: any) {
    return this.http.post<any>(
      `${this.config.api_url}/user/interswitch-internet-recharge-user`,
      formdata
    );
  }

  getISAirtimeBillers() {
    return this.http.get<any>(
      `${this.config.api_url}/user/interswitch-billers-wallet-balances`
    );
  }

  getISAirtimePaymentItems(biller_id: number) {
    return this.http.get<any>(
      `${this.config.api_url}/user/interswitch-billers-advise/${biller_id}`
    );
  }

  getElectricityBillers() {
    return this.http.get<any>(
      `${this.config.api_url}/user/services/electricity/providers?service_id=24`
    );
  }

  async buyElectricity(type,formData: any) {
    const pin = await this.pinService.runCheck(type);
    console.log(formData);
    if (pin) {
      return this.http
        .post<any>(
          `${this.config.api_url}/user/services/electricity/purchase`,
          formData,
          {
            headers: new HttpHeaders({ pin: pin }),
          }
        )
        .toPromise();
    }
  }

  verifyElectricity(plan: any, meterno: any) {
    console.log(plan, meterno);
    return this.http.post<any>(
      `${this.config.api_url}/user/services/verification`,
      {
        service_id: plan,
        account: meterno,
      }
    );
  }

  vendElectricity(data: any) {
    return this.http.post<any>(
      `${this.config.api_url}/user/vend-electricity/`,
      data
    );
  }

  getCableTvBillers() {
    return this.http.get<any>(
      `${this.config.api_url}/user/services/cabletv/providers`
    );
  }

  getCableProducts(biller_id: string) {
    return this.http.post<any>(
      `${this.config.api_url}/user/services/cabletv/products`,
      { service_id: biller_id }
    );
  }

  getCableProductItems(shortname: any, itemcode: any) {
    return this.http.get<any>(
      `${this.config.api_url}/user/cable-product-items/${shortname}/${itemcode}`
    );
  }

  async buyCable(data) {
    const pin = await this.pinService.runCheck();
    if (pin) {
      return this.http
        .post<any>(
          `${this.config.api_url}/user/services/cabletv/purchase`,
          data,
          {
            headers: new HttpHeaders({ pin: pin }),
          }
        )
        .toPromise();
    }
  }

  verifySmartCard(smartcard: any, shortname: any) {
    return this.http.get<any>(
      `${this.config.api_url}/user/verify-${shortname}/${smartcard}`
    );
  }

  getJambBillers(data) {
    console.log(data);
    return this.http.post<any>(
      `${this.config.api_url}/user/services/epin/products`,
      data
    );
  }

  async buyJamb(data) {
    console.log(data);
    const pin = await this.pinService.runCheck();
    if (pin) {
      return this.http
        .post<any>(`${this.config.api_url}/user/services/epin/purchase`, data, {
          headers: new HttpHeaders({ pin: pin }),
        })
        .toPromise();
    }
  }

  vendCable(
    shortname: string,
    customerName: string,
    customerNumber: any,
    invoicePeriod: number,
    amount: any,
    wallet: any
  ) {
    return this.http.post<any>(
      `${this.config.api_url}/user/vend-${shortname}`,
      {
        customentName: customerName,
        customerNumber,
        invoicePeriod,
        wallet,
        amount,
      }
    );
  }
}
