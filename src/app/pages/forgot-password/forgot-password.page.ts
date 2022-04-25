import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  AlertController,
  LoadingController,
  ToastController,
  NavController,
} from "@ionic/angular";
import { AuthenticationService } from "../../services/authentication.service";
import { Router } from "@angular/router";
import { first } from "rxjs/internal/operators/first";
import { TimerComponent } from "../../components/timer/timer.component";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  forgotForm: FormGroup;
  resetForm: FormGroup;
  passwordChangeForm: FormGroup;
  loading: any;
  error: string;
  submitted: boolean = false;
  email: any;
  resend_time: string = "";
  deadline: any;
  hidevalue: boolean;
  timer: any;
  maxTime: any = 0;
  showForgot: boolean = true;
  passwordshow: boolean = false;
  successpage: boolean = false;
  showreset: boolean = false;
  checkerror: boolean = false;

  newPassword: any;
  confirmPassword: any;

  token: any;

  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    private router: Router,
    public auth: AuthenticationService,
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    public nav: NavController
  ) {
    this.forgotForm = formBuilder.group({
      email: ["", Validators.compose([Validators.required])],
    });

    this.resetForm = formBuilder.group({
      reset_code: ["", Validators.compose([Validators.required])],
    });

    this.passwordChangeForm = formBuilder.group({
      token: ["", Validators.compose([Validators.required])],
      password: ["", Validators.compose([Validators.required])],
      password_confirmation: ["", Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {}

  get f() {
    return this.forgotForm.controls;
  }

  get r() {
    return this.resetForm.controls;
  }

  get p() {
    return this.passwordChangeForm.value;
  }

  showResetForm() {
    this.showForgot = false;
    this.passwordshow = false;
    this.successpage = false;
    this.showreset = true;

    this.StartTimer();
  }

  showPasswordChange() {
    this.passwordshow = true;
    this.showForgot = false;
    this.successpage = false;
    this.showreset = false;
  }

  showSuccessPage() {
    this.successpage = true;
    this.passwordshow = false;
    this.showForgot = false;
    this.showreset = false;
  }

  StartTimer() {
    this.timer = setTimeout((x) => {
      if (this.maxTime <= 0) {
      }
      this.maxTime -= 1;

      if (this.maxTime > 0) {
        this.hidevalue = false;
        this.StartTimer();
      } else {
        this.hidevalue = true;
      }
    }, 1000);
  }

  sendCode(): void {
    this.submitted = true;
    this.checkerror = true;

    if (!this.forgotForm.valid) {
      this.submitted = false;
      console.log(this.forgotForm.value);
      return;
    } else {
      this.auth.sendreset(this.f.email.value).subscribe(
        (data) => {
          this.email = this.f.email.value;
          this.checkerror = false;
          this.submitted = false;
          this.showPasswordChange();
        },
        (error) => {
          //this.showPasswordChange()
          this.error = "";
          this.submitted = false;
          if (error.status >= 400 && error.status < 500) {
            const errorData = error.error.errors;
            if (errorData !== null && typeof errorData !== "object") {
              this.error += error.error.errors;
            } else {
              for (let key in errorData) {
                console.log(key);
                this.error += errorData[key] + "\n";
              }
            }

            this.presentToast(this.error);
            this.nav.navigateForward("login");
          }
        }
      );
    }
  }

  resetPassword(): any {
    console.log("lo");
    this.presentLoading();
    this.submitted = true;
    this.checkerror = true;

    console.log(this.p, this.newPassword, this.confirmPassword);

    if (!this.passwordChangeForm.valid) {
      this.submitted = false;
      console.log(this.passwordChangeForm.value);
      return;
    } else {
      if (this.p.password !== this.p.password_confirmation) {
        this.presentToast("Password does not match");
        return false;
      } else {
        this.auth.resetpassword(this.p).subscribe(
          (data) => {
            this.submitted = false;
            this.checkerror = false;
            this.showSuccessPage();
            this.presentToast(data.message);
            this.gotoLogin();
          },
          (error) => {
            this.error = "";
            this.submitted = false;
            if (error.status >= 400 && error.status < 500) {
              const errorData = error.error.errors;
              if (errorData !== null && typeof errorData !== "object") {
                this.error += error.error.errors;
              } else {
                for (let key in errorData) {
                  console.log(key);
                  this.error += errorData[key] + "\n";
                }
              }

              this.presentToast(this.error);
              this.gotoLogin();
            }
          }
        );
      }
    }
  }

  gotoLogin() {
    this.router.navigate(["/login"]);
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: "Please Wait....",
      duration: 2000,
    });
    return await this.loading.present();
  }

  async presentToast(error: string) {
    const toast = await this.toastController.create({
      message: error,
      duration: 5000,
    });
    toast.present();
  }

}
