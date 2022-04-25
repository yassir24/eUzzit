import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ModalController, AlertController } from "@ionic/angular";
import { PinComponent } from "../components/pin/pin.component";
import { SetPinComponent } from "../components/set-pin/set-pin.component";

@Injectable({
  providedIn: "root",
})
export class CheckpinService {
  pinState: boolean = false;

  modal: any;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  async grantPass() {
    const { data } = await this.modal.onWillDismiss();

    return data.pin;
  }

  async validateBox(type, name ,p?) {
    this.modal = await this.modalController.create({
      component: PinComponent,
      animated: true,
      showBackdrop: true,
      backdropDismiss: false,
      componentProps: {
        action: "verify",
        ACDelbuttons: true,
        passcodeLabel: "Please Enter Pin",
        data: p,
        type,
        name
      },
    });

    await this.modal.present();

    return this.grantPass();
  }

  async runCheck(type?, name?, p?) {
    return await this.validateBox(type, name, p);
  }

  async updatePin(msg) {
    this.modal = await this.modalController.create({
      component: PinComponent,
      animated: true,
      showBackdrop: true,
      backdropDismiss: false,
      componentProps: {
        action: "verify",
        ACDelbuttons: true,
        passcodeLabel: msg,
      },
    });

    await this.modal.present();

    return this.grantPass();
  }

  async updatePin2() {
    const modal = await this.modalController.create({
      component: SetPinComponent,
      animated: true,
      showBackdrop: true,
      backdropDismiss: false,
      componentProps: {
        action: "update",
        stepTitle: "Enter Old Pin",
        ACDelbuttons: true,
        passcodeLabel: "Update Your Pin",
      },
    });

    await modal.present();

    const { data } = await this.modal.onWillDismiss();

    const alert = await this.alertController.create({
      header: data.head,
      message: data.body,
      buttons: ["OK"],
    });

    await alert.present();
  }

  async createPin() {
    const modal = await this.modalController.create({
      component: SetPinComponent,
      animated: true,
      showBackdrop: true,
      backdropDismiss: false,
      componentProps: {
        action: "create",
        stepTitle: "Enter Pin",
        ACDelbuttons: true,
        passcodeLabel: "Create Transaction Pin",
      },
    });

    await modal.present();

    const { data } = await this.modal.onWillDismiss();

    const alert = await this.alertController.create({
      header: data.head,
      message: data.body,
      buttons: ["OK"],
    });

    await alert.present();
  }
}
