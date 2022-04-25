import { Component, Input, Output, EventEmitter } from "@angular/core";
import {
  // Events,
  NavController,
  NavParams,
  ModalController,
  ToastController,
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
import { EventsService } from "src/app/services/events.service";

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss'],
})
export class PinComponent {

  data;
  type;
  name;
  enablebutton = true

  _showLockScreen: boolean;

  @Input() action: string;
  @Input() nextype: string;

  enteredPasscode: string = "";

  passcode: string;
  newpasscode: string;
  confirmpasscode: string;
  passcodeWrong;

  @Input() passcodeLabel: string = "Enter Pin";
  @Input() touchLabel: string = "Verify ID";

  selected: any;

  @Input() touchId: boolean = false;

  //@Output() result: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    // public events: Events,
    private events: EventsService,
    private storage: Storage,
    private touchIdObj: TouchID,
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) {
    this._showLockScreen = true;
    this.getPin();
  }

  async getPin() {
    this.passcode = await this.storage.get("savedpin");
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

    console.log(this.data)
    console.log(this.type)
    console.log(this.name)

    // setTimeout(()=>{
    //   if (this.touchId) {
    //     this.touchIdObj.isAvailable().then(
    //       res => {
    //         this.touchIdObj.verifyFingerprint(this.passcodeLabel).then(
    //           res => {
    //             this._showLockScreen = false;
    //           },
    //           err => {
    //               this.presentToast( 'Unable to unlock the device with this fingerprint.' );
    //             console.log("Unable to unlock the device with this fingerprint.");
    //           }
    //         )
    //       },
    //       err => {
    //         console.log("Touch ID is not available.");
    //       }
    //     )
    //   }
    // }, 50);
  }

  emitEvent(status: string) {
    //this.result.emit( status )
    this.modalCtrl.dismiss({
      pin: status,
    });
  }

  close() {
    this.modalCtrl.dismiss({
      pin: null,
    });
  }

  allClear(): void {
    this.enteredPasscode = "";
  }

  remove(): void {
    this.enteredPasscode = this.enteredPasscode.slice(0, -1);
  }

  digit(digit: any): void {
    this.selected = +digit;
    this.enteredPasscode += "" + digit;

    if (this.enteredPasscode.length >= 4) {
      this.enablebutton = false
      this.emitEvent(this.enteredPasscode);
      console.log(this.enteredPasscode);
      this.enteredPasscode = "";
      //emit event on the spot
      this._showLockScreen = false;
      //close this modal programmatically
    }
  }


}
