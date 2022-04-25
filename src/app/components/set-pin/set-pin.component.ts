import { Component, Input, Output, EventEmitter } from "@angular/core";
import {
  // Events,
  NavController,
  NavParams,
  ModalController,
  ToastController,
  AlertController,
} from "@ionic/angular";
import { TouchID } from "@ionic-native/touch-id/ngx";
import { Storage } from "@ionic/storage";
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from "@angular/animations";
import { AuthenticationService } from "./../../services/authentication.service";
import { EventsService } from "src/app/services/events.service";

@Component({
  selector: 'app-set-pin',
  templateUrl: './set-pin.component.html',
  styleUrls: ['./set-pin.component.scss'],
})
export class SetPinComponent {

  _showLockScreen: boolean;

  @Input() action: string;
  @Input() nextype: string;

  enteredPasscode: string = "";

  passcode: string;
  newpasscode: string;
  confirmpasscode: string;
  @Input() stepTitle: string;

  @Input() passcodeLabel: string = "Enter Pin";
  @Input() touchLabel: string = "Verify ID";

  selected: any;
  firstPin: any;
  confirming: boolean;
  passcodeWrong;
  confirmed: any;
  confimNew: boolean = false;

  confirmPasscodeLabel = "Confirm Pin";

  @Input() touchId: boolean = false;

  //@Output() result: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    // public events: Events,
    private events: EventsService,
    private storage: Storage,
    private touchIdObj: TouchID,
    private modalCtrl: ModalController,
    private toastController: ToastController,
    private authenticationService: AuthenticationService,
    private alertController: AlertController
  ) {
    this._showLockScreen = true;
  }

  async setPin(pin: number) {
    const saved = this.storage.set("savedpin", pin);
    this.modalCtrl.dismiss({
      pincheck: true,
      head: "Passcode Setup",
      body: saved
        ? " Passcode Setup successfully!"
        : "Error setting up Passcode",
    });
  }

  ngOnInit() {
    //this.stepTitle = this.action === "create" ? "Enter Pin" : "Enter Old Pin";
  }

  emitEvent(status: string) {
    //this.result.emit( status )
    this.modalCtrl.dismiss({
      "set-pin": status,
    });
  }

  close() {
    this.enteredPasscode = "";
    this.firstPin = "";
    this.confirming = false;
    this.newpasscode = "";
    this.confirmpasscode = "";
    this.confimNew = false;
    this.stepTitle = "";

    this.modalCtrl.dismiss({
      "set-pin": null,
    });
  }

  allClear(): void {
    this.enteredPasscode = "";
  }

  remove(): void {
    this.enteredPasscode = this.enteredPasscode.slice(0, -1);
  }

  async presentToast(error: string) {
    const toast = await this.toastController.create({
      message: error,
      duration: 5000,
    });
    toast.present();
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: "Success!",
      message: msg,
      buttons: ["OK"],
    });
    await alert.present();
  }

  digit(digit: any): void {
    this.selected = +digit;
    this.enteredPasscode += "" + digit;

    if (this.enteredPasscode.length >= 4) {
      if (!this.firstPin) {
        console.log(this.enteredPasscode);
        this.firstPin = this.enteredPasscode;
        this.confirming = true;
        // this.enteredPasscode = '';
        this.allClear();
        this.stepTitle =
          this.action === "create" ? "Confirm Pin" : "Enter New Pin";
      } else if (this.firstPin && this.action === "create") {
        console.log(
          "%c This is the set pin working",
          "color: red; font-size: 1.3em"
        );
        console.log(this.enteredPasscode, this.firstPin);
        this.authenticationService
          .setPin({
            transaction_pin: this.firstPin,
            transaction_pin_confirmation: this.enteredPasscode,
          })
          .subscribe(
            (data) => {
              if (data.status == "success") {
                localStorage.setItem("pinstats", "true");
              }

              console.log("This is the set pin payload", data);
              this.presentAlert(data.data.message);
              this.emitEvent(this.enteredPasscode);
            },
            (error) => {
              console.log(error);
              this.presentToast(error.error.message);
              this.enteredPasscode = "";
              this.firstPin = "";
              this.confirming = false;
              this.close();
            }
          );
      } else if (this.firstPin && this.action === "update") {
        if (!this.newpasscode) {
          this.newpasscode = this.enteredPasscode;
          this.confimNew = true;
          this.allClear();
          this.stepTitle = "Confirm New Pin";
        } else {
          this.confirmpasscode = this.enteredPasscode;
          this.authenticationService
            .updatePin({
              old_transaction_pin: this.firstPin,
              transaction_pin: this.newpasscode,
              transaction_pin_confirmation: this.confirmpasscode,
            })
            .subscribe(
              (data) => {
                console.log(
                  "%c This is the Update pin working",
                  "color: red; font-size: 1.3em"
                );
                console.log(data);
                this.presentAlert(data.message);
                this.emitEvent(this.enteredPasscode);
              },
              (error) => {
                console.log(
                  "%c This is the Update pin error",
                  "color: red; font-size: 1.3em"
                );
                console.log(error);
                this.presentToast(error.error.message);
                this.enteredPasscode = "";
                this.firstPin = "";
                this.confirming = false;
                this.newpasscode = "";
                this.confirmpasscode = "";
                this.confimNew = false;
                this.close();
              }
            );
        }
      }
      // this.emitEvent(this.enteredPasscode);
      // console.log(this.enteredPasscode);
      this.enteredPasscode = "";
      //emit event on the spot
      // this._showLockScreen = false;
      //close this modal programmatically
    }
  }

}
