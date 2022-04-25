import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Config } from "../providers/config";
import { Storage } from "@ionic/storage";
import { ThrowStmt } from "@angular/compiler";
// import { userInfo } from 'os';

@Injectable({
  providedIn: "root",
})
export class WalletService {
  constructor(
    private http: HttpClient,
    public config: Config,
    public storage: Storage
  ) {}

  checkWallet() {
    return this.http.get<any>(`${this.config.api_url}/user/wallet/check`);
  }

  getWallets() {
    return this.http.get<any>(`${this.config.api_url}/user/wallets/all`);
  }

  getMyCoin() {
    return this.http
      .get<any>(`${this.config.api_url}/user/profile`)
      .toPromise()
      .then(
        (res) => {
          this.storage.set("user", res.data.user);
          return this.filterCoin(res.data.user.user_wallets)[0];
        },
        () => {
          return this.storage
            .get("user")
            .then((user) => this.filterCoin(user.user_wallets))[0];
        }
      );
  }

  getMyWallets() {
    return this.http
      .get<any>(`${this.config.api_url}/user/profile`)
      .toPromise()
      .then(
        (res) => {
          this.storage.set("user", res.data.user);
          return this.removeCoin(res.data.user.user_wallets);
        },
        () => {
          return this.storage
            .get("user")
            .then((user) => this.removeCoin(user.user_wallets));
        }
      );
  }

  verifyUser(data: any) {
    this.http.post<any>(
      `${this.config.api_url}/user/transfer/validate_user`,
      data
    );
  }

  removeCoin(data) {
    return data.filter((val) => val.slug != "coin");
  }

  filterCoin(data) {
    return data.filter((val) => val.slug == "coin");
  }

  getWalletInfo() {
    return this.http.get<any>(`${this.config.api_url}/user/wallets/info`);
  }

  getTransactionRef(data: any) {
    return this.http.post<any>(
      `${this.config.api_url}/user/transfer/generate_transaction_ref`,
      data
    );
  }

  fundWallet(data: any) {
    return this.http.post<any>(
      `${this.config.api_url}/user/transfer/process_transaction`,
      data
    );
  }

  updateUser(data) {
    // this.storage.set("user", data);
  }

  getstates() {
    console.log("ll");
    return this.http.get<any>(`${this.config.api_url}/states`);
  }
}
