import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Config } from "../providers/config";
import { Storage } from "@ionic/storage";
import { Router, ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  userstate: any;
  public user: any;
  public zit: any;

  isLoggedIn: boolean;

  constructor(
    private http: HttpClient,
    public config: Config,
    public route: ActivatedRoute,
    public router: Router,
    public storage: Storage
  ) {}

  login(phone: string, password: string) {
    console.log(phone);
    return this.http
      .post<any>(`${this.config.api_url}/auth/login`, {
        email: phone,
        password: password,
      })
      .pipe(
        map((result) => {
          console.log(result);
          // login successful if there's a jwt token in the response
          if (result.status == "success") {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
           
            this.setUser(result.data.user)
            this.storage.set("user", result.data.user);
           
            this.storage.set("zit", result.data.zit);
          
            this.storage.set("token", result.data.access_token);

            if (result.profile) {
              this.storage.set("profile", result.data.user);
            }
          }
          return result;
        })
      );
  }

  setUser(res) {
    console.log('setting user', res)
    return this.user = res
  }

  getUser() {
    return this.user;
  }
  setZit(res) {
    return this.zit = res
  }

  register(data: any) {
    return this.http.post<any>(`${this.config.api_url}/auth/register`, data);
  }

  sendreset(email: string) {
    return this.http.post<any>(`${this.config.api_url}/forgot_password`, {
      email,
    });
  }

  verifycode(reset_code: string, phone: string) {
    return this.http.put<any>(
      `${this.config.api_url}/user/verify-reset-code/` + phone,
      { reset_code: reset_code }
    );
  }

  changepassword(data: any) {
    return this.http.post<any>(
      `${this.config.api_url}/user/change_password`,
      data
    );
  }

  resetpassword(data: any) {
    return this.http.post<any>(
      `${this.config.api_url}/forgot_password/reset`,
      data
    );
  }

  getuserdetails() {
    return this.http.get<any>(`${this.config.api_url}/user/stats`);
  }

  // forgotpassword(data: any) {
  //   return this.http.put<any>(`${this.config.api_url}/user/forgot_password`, data);
  // }

  async logout() {
    return await this.storage.clear();
  }

  async getValidationState() {
    const value = <any>await this.storage.get("reg");
    console.log(`async result: ${value}`);

    return value;
  }

  isLogin() {
    this.storage.get("user").then((val) => {
      console.log("Your age is", val);
    });

    return localStorage.getItem("user") !== null;
  }

  async authState() {
    let user = await this.storage.get("user");

    if (user && user.status !== null) {
      this.isLoggedIn = true;

      console.log('is a go')
      // if(user.status == 1) {
      //   return '/validate-phone';
      // }
      // else if(userstate == 2){
      //  return '/complete-profile';
      // }
      // else if(userstate == 4)
      // {
      //   return '/dashboard/dashboard/merchant';
      // }
      return true;
    } else {
      this.isLoggedIn = false;
      return false
    }
  }

  async runNoAuthGuard() {
    let userstate = await this.storage.get("user");
    // console.log( userstate)
    if (userstate !== null) {
      if (userstate.rstate == 1) {
        await this.router.navigate(["/validate-phone"], {
          relativeTo: this.route,
          skipLocationChange: true,
        });
        return false;
      } else if (userstate.rstate == 2) {
        await this.router.navigate(["/complete-profile"], {
          relativeTo: this.route,
          skipLocationChange: true,
        });
        return false;
      } else if (userstate.rstate == 4) {
        await this.router.navigateByUrl("/dashboard", {
          skipLocationChange: true,
        });
        return false;
      }
    }

    return true;
  }

  resendActivationCode(data) {
    return this.http.post<any>(`${this.config.api_url}/auth/resend_code`, data);
  }

  activate_account(data) {
    return this.http.post<any>(
      `${this.config.api_url}/auth/activate_account`,
      data
    );
  }

  updateTransPin(data) {
    return this.http.post<any>(
      `${this.config.api_url}/user/update_transaction_pin`,
      data
    );
  }

  setPin(data) {
    return this.http.post<any>(
      `${this.config.api_url}/user/set_transaction_pin`,
      data
    );
  }

  updatePin(data) {
    return this.http.post<any>(
      `${this.config.api_url}/user/update_transaction_pin`,
      data
    );
  }

  resetPin(data) {
    return this.http.post<any>(
      `${this.config.api_url}/user/reset_transaction_pin`,
      data
    );
  }
}
