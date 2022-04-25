import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";

import {
  AlertController,
  LoadingController,
  // Events,
  Platform,
  NavController,
} from "@ionic/angular";
import { Router, NavigationExtras } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
import { first } from "rxjs/operators";
// import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { Storage } from "@ionic/storage";
import { UserService } from "src/app/services/user.service";
import { EventsService } from "src/app/services/events.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  loading: any;
  error: string;
  submitted: boolean = false;
  checkerror: boolean = false;
  showPassword: boolean = true;
  storageDriver: any;
  validationUserMessage = {
    email: [
      { type: "required", message: "Please enter a valid ID." },
      { type: "pattern", message: "Entered  valid ID is incorrect.Try again" },
    ],
    password: [
      { type: "required", message: "please Enter your Password!" },
      {
        type: "minlength",
        message: "The Password must be at least 6 characters or more",
      },
    ],
  };
  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    private router: Router,
    public auth: AuthenticationService,
    public user: UserService,
    public formBuilder: FormBuilder,
    public navController: NavController,
    public events: EventsService,
    private platform: Platform,
    private storage: Storage,
    // private splashScreen: SplashScreen
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl("", Validators.compose([Validators.required])),
      password: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
    });
    this.removeData();
    this.platform.ready().then(() => {
      setTimeout(() => {
        // this.splashScreen.hide();
      }, 3000);
      // this.splashScreen.hide();
    });
    // this.events.subscribe('logout', (data) =>{
    // 	this.auth.logout();
    // 	console.log(data);
    //   });
  }

  async removeData() {
    return await this.auth.logout();
  }

  async clearStorage() {
    await this.storage.set('tutorialComplete', false);
    console.log('storage cleared')
  }

  ngOnInit() {}

  get f() {
    return this.loginForm.controls;
  }

  loginUser() {
    this.submitted = true;
    this.checkerror = true;
    if (!this.loginForm.valid) {
      this.submitted = false;
      console.log(this.loginForm.value);
      return;
    } else {
      this.auth.login(this.f.email.value, this.f.password.value).subscribe(
        (result) => {
          localStorage.setItem("pinstats", result.data.user.has_pin);
         
          // redirect user base on reg state
          this.presentLoading();
          console.log(result.data.user.status);
          switch (result.data.user.status) {
            case "ENABLE":
              // this.events.publish("login", "Login!");
              this.events.publish("login", { action: "Login!"});
              this.navController.setDirection("root");
              this.router.navigateByUrl("/");
              break;
          }
          this.submitted = false;
        },
        (error) => {
          this.error = "";
          this.submitted = false;
          console.log(error);

          if (error.status >= 400 && error.status < 500) {
            const errorData = error.error.errors;
            if (errorData !== null && typeof errorData !== "object") {
              if (errorData && errorData.includes("activated")) {
                this.navController.setDirection("root");
                const navigationExtras: NavigationExtras = {
                  queryParams: {
                    phone: error.error.data.user.phone,
                    page: "login",
                  },
                };
                this.router.navigate(["/validate-phone"], navigationExtras);
                return;
              }
              this.error += "Invalid Login Credentials";
            } else {
              for (let key in errorData) {
                console.log(key);
                this.error += errorData[key] + "\n";
              }
            }

            this.presentAlert(this.error);
            this.submitted = false;
          }
        }
      );
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: "Please Wait....",
      duration: 1000,
    });
    return await this.loading.present();
  }

  async presentAlert(error: string) {
    const alert = await this.alertController.create({
      header: "Login failed",
      message: error,
      buttons: ["OK"],
    });
    await alert.present();
  }

  openSignup(): void {
    this.router.navigate(["signup"]);
  }

  openForgotPwd(): void {
    this.router.navigate(["forgot-password"]);
  }

}
