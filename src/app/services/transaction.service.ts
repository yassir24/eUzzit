import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Config } from "../providers/config";
import { Storage } from "@ionic/storage";
import { CheckpinService } from "../services/checkpin.service";

@Injectable({
  providedIn: "root",
})
export class TransactionService {
  constructor(
    private http: HttpClient,
    public config: Config,
    public storage: Storage,
    private pinService: CheckpinService
  ) {}

  checkWallet() {
    return this.http.get<any>(`${this.config.api_url}/user/wallet/check`);
  }

  getWallets() {
    return this.http.get<any>(`${this.config.api_url}/user/wallets/all`);
  }

  getAccountName(bankcode: any, account: any) {
    return this.http.post<any>(
      `${this.config.api_url}/user/bank_account_namefinder`,
      {
        bank_id: bankcode,
        account_no: account,
      }
    );
  }

  getBankHistory() {
    return this.http.get<any>(`${this.config.api_url}/user/send-bank-history`);
  }

  getBanks() {
    return this.http.get<any>(`${this.config.api_url}/banks`);
  }

  getHistory() {
    return this.http.get<any>(`${this.config.api_url}/user/send-history`);
  }

  getTransactions(page: number = 1) {
    return this.http.get<any>(
      `${this.config.api_url}/user/transactions?per_page=10000`
    );
  }

  generatelifelinecode(data: any) {
    return this.http.post<any>(
      `${this.config.api_url}/user/upgrade/generate-lifeline-codes`,
      data
    );
  }

  createServices(data: any) {
    return this.http.post<any>(
      `${this.config.api_url}/user/merchant/service`,
      data
    );
  }

  getServices(data: any) {
    return this.http.post<any>(
      `${this.config.api_url}/user/merchant/services`,
      data
    );
  }

  getTransactionSearch(start_date: any, end_date: any) {
    return this.http.get<any>(
      `${this.config.api_url}/user/transaction-search/${start_date}/${end_date}`
    );
  }

  lifelinelist() {
    return this.http.get<any>(
      `${this.config.api_url}/user/upgrade/lifeline-codes`
    );
  }

  transfer(receiver: number, amount: any, wallet: string) {
    return this.http.post<any>(`${this.config.api_url}/user/wallet-transfer`, {
      amount,
      wallet,
      receiver,
    });
  }

  transferMerchant(data) {
    return this.http.post<any>(
      `${this.config.api_url}/user/merchant_transfer`,
      data
    );
  }

  verifyWallet(data) {
    return this.http.post<any>(
      `${this.config.api_url}/user/transfer/validate_user`,
      data
    );
  }

  verifyMerchant(data) {
    return this.http.post<any>(`${this.config.api_url}/user/merchant`, data);
  }

  async makeWalletTransfer(to_user: string, wallet: string, amount: number) {
    const pin = await this.pinService.runCheck();
    if (pin) {
      return this.http
        .post<any>(
          `${this.config.api_url}/user/transfer/wallet_to_wallet`,
          { to_user, wallet, amount },
          {
            headers: new HttpHeaders({ pin: pin }),
          }
        )
        .toPromise();
    }
  }

  async makeMerchantTransfer(data: any) {
    const pin = await this.pinService.runCheck();
    if (pin) {
      return this.http
        .post<any>(`${this.config.api_url}/user/merchant/payment`, data, {
          headers: new HttpHeaders({ pin: pin }),
        })
        .toPromise();
    }
  }

  async activateWallet(data: any) {
    // if (!referral) {
    //   return this.http.get<any>(`${this.config.api_url}/user/activate-account?wallet=${wallet}`);
    // }
    const pin = await this.pinService.runCheck();
    if (pin) {
      return this.http
        .post<any>(`${this.config.api_url}/user/account_activation`, data, {
          headers: new HttpHeaders({ pin: pin }),
        })
        .toPromise();
    }
  }

  async upgradeWallet(formdata: any) {
    const pin = await this.pinService.runCheck();
    if (pin) {
      return this.http
        .post<any>(`${this.config.api_url}/user/upgrade`, formdata, {
          headers: new HttpHeaders({ pin: pin }),
        })
        .toPromise();
    }
  }

  async upgradeLifelineWallet(formdata: any) {
    const pin = await this.pinService.runCheck();
    if (pin) {
      return this.http
        .post<any>(`${this.config.api_url}/user/upgrade`, formdata, {
          headers: new HttpHeaders({ pin: pin }),
        })
        .toPromise();
    }
  }

  getUpgradeData() {
    return this.http.get<any>(
      `${this.config.api_url}/user/upgrade-account-advise`
    );
  }

  sendTransfer(formdata: any) {
    return this.http.post<any>(
      `${this.config.api_url}/user/bank-funds-transfer`,
      formdata
    );
  }

  async sendMoney(data: any) {
    const pin = await this.pinService.runCheck();
    if (pin) {
      return this.http
        .post<any>(`${this.config.api_url}/user/transfer/withdraw_fund`, data, {
          headers: new HttpHeaders({ pin: pin }),
        })
        .toPromise();
    }
  }

  getTransactionHistory() {
    return this.http.get<any>(
      `${this.config.api_url}/user/transactions?per_page=10000`
    );
  }
  getTransactionHistory2() {
    return this.http.get<any>(
      `${this.config.api_url}/user/transactions/wallets?per_page=10000`
    );
  }
}
