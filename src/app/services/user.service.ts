import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Config } from "../providers/config";
import { map } from "rxjs/operators";
import { Storage } from "@ionic/storage";
import { CheckpinService } from "../services/checkpin.service";

@Injectable({
  providedIn: "root",
})
export class UserService {

  private userdata: any;
  constructor(
    public http: HttpClient,
    public config: Config,
    public storage: Storage,
    private pinService: CheckpinService
  ) {}

  updatePhone(phone: any, user: number) {
    return this.http.put<any>(
      `${this.config.api_url}/user/update-phone/` + user,
      { phone: phone }
    );
  }

  accountNo() {
    return this.http.get<any>(
      `https://wallet.euzzit.com/api/v1/user/virtual-account`
    );
  }

  getGeoData(lat: any, long: any) {
    return this.http.get<any>(
      `https://eu1.locationiq.com/v1/reverse.php?key=303923a99c85d9&lat=${lat}&lon=${long}&format=json`
    );
  }

  verifyCode(code: number, user: number) {
    return this.http
      .put<any>(`${this.config.api_url}/user/verify-code/` + user, {
        validation_code: code,
      })
      .pipe(
        map((result) => {
          // login successful if there's a jwt token in the response
          if (result && result.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.storage.set("user", result.user);
            this.storage.set("rstate", result.rstate);
            this.storage.set("token", result.token);
          }
          return result;
        })
      );
  }

  completeprofile(formdata: any, user: any) {
    return this.http
      .put<any>(
        `${this.config.api_url}/user/complete-profile/` + user,
        formdata
      )
      .pipe(
        map((result) => {
          // login successful if there's a jwt token in the response
          if (result.status == "success") {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.storage.set("profile", result.profile);
            this.storage.remove("rstate");
            this.storage.set("rstate", 4);
          }
          return result;
        })
      );
  }

  async editProfile(formData: any) {
    const pin = await this.pinService.runCheck();
    if (pin) {
      return this.http
        .put<any>(`${this.config.api_url}/user/update_profile`, formData, {
          headers: new HttpHeaders({ pin: pin }),
        })
        .toPromise();
    }
  }

  fundWallet() {}
  /*
  this gets the profile data of the current loggedin user
*/
  getprofile() {
    return this.storage.get("profile");
  }

  getUserdata() {
    return this.userdata;
  }

  setUserdata(userdata) {
    
    return this.userdata = userdata;

  }



}
