import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { AlertController, LoadingController } from "@ionic/angular";
import { Router, NavigationExtras } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
import { first } from "rxjs/operators";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

 
  signUpForm: FormGroup;
  loading: any;
  submitted: boolean = false;
  error: string;
  checkerror: boolean = false;
  showPassword: boolean = true;
  check: boolean = false;

  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    private router: Router,
    private iab: InAppBrowser,
    public formBuilder: FormBuilder,
    public auth: AuthenticationService
  ) {
    this.signUpForm = formBuilder.group({
      first_name: ["", Validators.compose([Validators.required])],
      last_name: ["", Validators.compose([Validators.required])],
      email: ["", Validators.compose([Validators.required])],
      username: ["", Validators.compose([Validators.required])],
      phone: ["", Validators.compose([Validators.required])],
      referral_code: [""],
      password: ["", Validators.compose([Validators.required])],
      password_confirmation: ["", Validators.compose([Validators.required])],
    });
  }

  checkbox() {
    this.check = !this.check;
    console.log(this.check);
  }

  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.password_confirm.value;

    return pass === confirmPass;
  }

  ngOnInit() {}

  get f() {
    return this.signUpForm.value;
  }

  signUpUser() {
    this.submitted = true;
    this.checkerror = true;
    console.log(this.signUpForm);
    if (!this.signUpForm.valid) {
      this.submitted = false;
      return;
    }
    // register(phone:string, password:string, confirm_password:string, referal_code: string)
    this.auth.register(this.f).subscribe(
      (res) => {
        console.log("res");
        if (res.status == "success") {
          const navigationExtras: NavigationExtras = {
            queryParams: {
              phone: this.f.phone,
              page: "signup",
            },
          };
          this.router.navigate(["/validate-phone"], navigationExtras);
          this.submitted = false;
        }
      },
      (error) => {
        this.error = "";
        this.submitted = false;

        console.log(error);

        if (error.status >= 400 && error.status < 500) {
          const errorData = error.error.errors;
          if (errorData !== null && typeof errorData !== "object") {
            this.error += error.error.errors;
          }

          for (let key in errorData) {
            console.log(key);
            this.error += errorData[key] + "\n";
          }

          this.presentAlert("Error", this.error);
        }
        this.loading = false;
      }
    ).unsubscribe;
  }

  terms() {
    console.log("ll");
    this.iab.create("https://euzzit.com/terms.html");
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: "waiting",
      duration: 1000,
    });
    return await this.loading.present();
  }

  async presentAlert(header: any, error: string) {
    const alert = await this.alertController.create({
      subHeader: "Error Signing Up",
      message: error,
      buttons: ["OK"],
    });

    await alert.present();
  }

  openLogin(): void {
    this.router.navigate(["login"]);
  }

  openForgotPwd(): void {
    this.router.navigate(["forgot"]);
  }

}
