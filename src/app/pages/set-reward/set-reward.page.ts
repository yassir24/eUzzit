import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PopoverController, ToastController } from '@ionic/angular';
import { InfoComponent } from 'src/app/components/info/info.component';
import { CheckpinService } from '../../services/checkpin.service';
import { MerchantService } from '../../services/merchant.service';

@Component({
  selector: 'app-set-reward',
  templateUrl: './set-reward.page.html',
  styleUrls: ['./set-reward.page.scss'],
})
export class SetRewardPage implements OnInit {

  frmSetReward: FormGroup;
  submitted = false;

  successheader: string;
  successmessages: string;
  coins: any;
  success = false;

  constructor(
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    private checkPinService: CheckpinService,
    public popoverCtrl: PopoverController,
    private merchantService: MerchantService
  ) {
    this.frmSetReward = formBuilder.group({
      reward: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
  }

  async setReward() {
    if (!this.frmSetReward.valid) {
      this.submitted = false;
      return;
    } else {
      const reward = this.frmSetReward.get('reward').value
      if (reward >= 1 && reward <= 100) {

        (await this.merchantService.setReward({ discount: reward })).subscribe(async (data) => {
          console.log("%c This is where the payload is ", "color: yellow; fonnt-size: 1.4em");
          console.log(data);

          if (data.status === "error") {
            await this.presentToast(data.data);
          } else if (data.status === "success") {
            this.submitted = true;
            this.successmessages = `You have successfully updated your customer's reward to ${reward}%`;
            this.successheader = 'Update Successful!';
            this.success = true;
          }
        },
          async(error) => {
            console.log("%c This is where the error is ", "color: yellow; fonnt-size: 1.4em");
            console.log(error);
            await this.presentToast("Network Error");
          })

        // this.submitted = true;
        //   this.successmessages = `You have successfully updated your customer's reward to ${reward}%`;
        //   this.successheader = 'Update Successful!';
        //   this.success = true;
      } else {
        await this.presentToast('Invalid reward percentage');
      }
    }
  }

  // async pinCheck() {
  //   const result = await this.checkPinService.runCheck();
  //   return (result === true);
  // }
  async help() {
    const content = `<p>To Attract customers increase reward percentage from ( 1 % & above) to keep customers coming back for more and even refer new customers.</p>`;
    const pop = await this.popoverCtrl.create({
      component: InfoComponent,
      cssClass: 'popover',
      componentProps: {
        content
      }
    });
    await pop.present();
  }

  async presentToast(error: string) {
    const toast = await this.toastController.create({
      message: error,
      duration: 5000,
      mode: 'ios',
      color: 'dark',
      animated: true
    });
    await toast.present();
  }

  limitRangeTo100() {
    let reward = this.frmSetReward.get('reward').value;
    if (reward > 100) {
      this.frmSetReward.patchValue({
        reward: 100
      })
    } else if (reward < 0) {
      this.frmSetReward.patchValue({
        reward: 1
      })
    }
  }
}
