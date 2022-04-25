import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class Config {
  developer_name = "Dafe Jefferson";
  appname = "eUzzit Wallet";
  // api_url: string = 'http://127.0.0.1/euwallet/public/api';
  // storage_url: string = 'http://127.0.0.1/euwallet/public/';
  // api_url: string = 'http://192.168.8.24/euwallet/public/api';
  // storage_url: string = 'http://192.168.8.24/euwallet/public/';
  // api_url = 'http://euzzit.com/api/public/api';
  // api_url = 'http://localhost:8000/api';
  api_url = "https://wallet.euzzit.com/api/v1";
  // storage_url = 'http://euzzit.com/api/public/';
  storage_url = "https://wallet.euzzit.com/api/public";
  // storage_url: string = 'http://127.0.0.1:8000/';
}
