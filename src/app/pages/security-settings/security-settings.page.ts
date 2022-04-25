import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import {
  AlertController,
  ToastController,
  NavController,
} from "@ionic/angular";
import { CheckpinService } from "../../services/checkpin.service";
import { AuthenticationService } from "../../services/authentication.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-security-settings',
  templateUrl: './security-settings.page.html',
  styleUrls: ['./security-settings.page.scss'],
})
export class SecuritySettingsPage implements OnInit {

  showPassword: any;
  showPin;
  checkerror;
  ismain;
  passcode: any;
  resetPinConfirmationAlert = `Please we recommend that you only do this when your Pin has been compromised or when you have forgotten your Pin.<br><br>
  On resetting your Pin, the new Pin would be sent via your Email address.`;

  changePass: boolean = false;
  changePasswordForm: any;
  submitted: boolean = false;

  constructor(
    private storage: Storage,
    private alertController: AlertController,
    private toastController: ToastController,
    private pinService: CheckpinService,
    private authService: AuthenticationService,
    public nav: NavController,
    public formBuilder: FormBuilder
  ) {
    this.changePasswordForm = formBuilder.group({
      old_password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      new_password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      new_password_confirmation: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  async ngOnInit() {
    this.passcode = await this.storage.get("savedpin");
    this.storage.get("user").then((data) => {
      this.showPin = !data.has_pin;
    });
    console.log(
      "%c This is the passcode on here ",
      "color: green; font-size: 1.3em"
    );
    console.log(this.passcode);
  }

  async updatePin() {
    await this.pinService.updatePin2();
  }

  async createPin() {
    await this.pinService.createPin();
  }

  async resetPin() {
    await this.presentAlert(
      "You are about to reset your Transaction Pin",
      this.resetPinConfirmationAlert,
      "Confirm Reset"
    );
  }

  async presentAlert(header, msg, confirmText) {
    const alert = await this.alertController.create({
      header: header,
      message: msg,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            this.submitted = false;
          },
        },
        {
          text: confirmText,
          handler: async () => {
            this.authService.resetPin({}).subscribe(
              (data) => {
                console.log(
                  "%c This is the Update pin working",
                  "color: red; font-size: 1.3em"
                );
                console.log(data);
                this.presentSuccessAlert(data.message);
              },
              (error) => {
                console.log(
                  "%c This is the Update pin error",
                  "color: red; font-size: 1.3em"
                );
                console.log(error);
                this.presentToast(error.error.message);
              }
            );
          },
        },
      ],
    });
    await alert.present();
  }

  async presentChangeAlert(header, msg, confirmText) {
    const alert = await this.alertController.create({
      header: header,
      message: msg,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            this.submitted = false;
          },
        },
        {
          text: confirmText,
          handler: async () => {
            console.log(this.p);
            this.authService.changepassword(this.p).subscribe(
              (data) => {
                if (data.status === "success") {
                  this.presentSuccessAlert(data.message);
                  this.submitted = false;
                  this.resetPage();
                  this.nav.navigateForward("profile-settings");
                } else {
                  this.presentToast(data.message);
                  this.submitted = false;
                  this.resetPage();
                  this.nav.navigateForward("profile-settings");
                }
              },
              (error) => {
                console.log(error);
                this.presentToast(error.error.message);
                this.submitted = false;
                this.resetPage();
                this.nav.navigateForward("profile-settings");
              }
            );
          },
        },
      ],
    });
    await alert.present();
  }

  resetPage() {
    this.changePasswordForm.patchValue({
      old_password: "",
      new_password: "",
      new_password_confirmation: "",
    });

    this.changePass = false;
    this.submitted = false;
  }

  get p() {
    return this.changePasswordForm.value;
  }

  async presentSuccessAlert(message) {
    const alert = await this.alertController.create({
      header: "Success!",
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  async presentToast(error) {
    const toast = await this.toastController.create({
      message: error,
      duration: 5000,
    });
    toast.present();
  }

  profileSettingsPage() {
    this.nav.navigateForward("/");
  }

  changePassword() {
    if (this.changePasswordForm.valid) {
      this.submitted = true;
      this.presentChangeAlert(
        "Confirm change",
        "Are you sure You want to change your password?",
        "Procceed"
      );
    }
  }

}
