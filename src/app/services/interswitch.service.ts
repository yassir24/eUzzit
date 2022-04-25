import { Injectable } from '@angular/core';
import { Sha1 } from '../providers/sha1';
import { HttpClient } from '@angular/common/http';
import { Config } from '../providers/config';

@Injectable({
  providedIn: 'root'
})
export class InterswitchService {

  public httpMethod: string;
  public  url:string;

  clientId: string = "IKIA64F2DEFE664854E711F3BA0DFDE64E59C6925066";
  authorization: string = "InterswitchAuth" + " "+this.b64EncodeUnicode(this.clientId);
  clientSecret: string = "a1ri2fe+9UyQqA9nv7hTC+oJU/NOac4rvPhePB9QSik=";
  access_token: string = "eyJhbGciOiJSUzI1NiJ9.eyJhdWQiOlsiYmFua2luZyIsImJpbGwtcGF5bWVudC1zZXJ2aWNlIiwiY2FyZCIsImZpbmFjbGUiLCJmaW5hbmNpYWwiLCJwYXltZW50IiwicXVpY2t0ZWxsZXIiLCJxdWlja3RlbGxlci13YWxsZXQiLCJ0cmFuc2ZlciIsInZlbmQiXSwic2NvcGUiOlsicHJvZmlsZSJdLCJleHAiOjE1NTQ3MjM2NDEsImNsaWVudF9sb2dvIjpudWxsLCJqdGkiOiIxZjUwZGU5MS0zZTlkLTQ0NWMtYjExZS0yNDhjMDg4YjA3OGUiLCJjbGllbnRfZGVzY3JpcHRpb24iOm51bGwsImNsaWVudF9pZCI6IklLSUE2NEYyREVGRTY2NDg1NEU3MTFGM0JBMERGREU2NEU1OUM2OTI1MDY2In0.IP99yH3A5xDkdyPB5USvlwC8QNbnmMRwgzjEx61WdWBPyT_HqVP-qul3M_VWj8awW9m5PMFqRG6MimfbXSG9TgBNyXhk-6M5QN9J9mxUt-4h31WqpRjtVf-mrM2WBp14PjRGXeJlmEitak3faqGoJJ9SS2D4wwC283If4nS1Qcoq-7_E9qvME4W8Gl1429E6IYSr_ydrPYFBCPMMffmVG9Nh7eQexaY5KOGVdlIb_EvM6bIL_m";

  
signatureCipher: any;
/// = this.httpMethod + "&"+ encodeURIComponent(this.url) + "&" +this.timestamp() + "&" + this.nonce + "&" + this.clientId + "&" + this.clientSecret;
   
 signature: any;
  //= this.hexToBase64(this.sha1.hash(this.signatureCipher));
  header: any;

  constructor(public config: Config, public http: HttpClient, public sha1: Sha1) { }

  requestCall(httpMethod: any, url: string, postData:string = null) {

    this.url = url;
    this.httpMethod = httpMethod;

    let nonce: any = this.guid();

    this.signatureCipher = this.httpMethod + "&"+ encodeURIComponent(this.url) + "&" +this.timestamp() + "&" + nonce + "&" + this.clientId + "&" + this.clientSecret;

    this.signature = this.hexToBase64(this.sha1.hash(this.signatureCipher));

    
  this.header = {
    'terminalId':'3ERT0001',
    'Content-Type':'application/json',
    'Timestamp':this.timestamp()+'',
    'Nonce':nonce,
    'Signature':this.signature,
    'SignatureMethod':'SHA1',
    'Authorization':this.authorization
    };
  

    if(httpMethod == 'GET')
    {
      return this.http.get<any>(url, { headers: this.header });
    }

    if(httpMethod == 'POST')
    {
      return this.http.post<any>(url, postData, { headers: this.header });
    }
  }
  
  
  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
    }

  guid() {
   
    return this.s4() + this.s4() + this.s4() + this.s4() + 
    this.s4() + this.s4() + this.s4() + this.s4();
  }
  
  timestamp(){
    return Date.now()/1000 | 0;
  }

  hexToBase64( str ) {
    return btoa(String.fromCharCode.apply(null,
    str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
    );
  }

  b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode(parseInt(p1, 16))
    }))
  }

  b64EncodeUni(str: any) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        // function toSolidBytes(match, p1) {
        (match, p1) => {
          // console.debug('match: ' + match);
          return String.fromCharCode(("0x" + p1) as any);
        }));
  }
}
