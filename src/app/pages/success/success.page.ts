import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Share } from '@capacitor/share';
import { Screenshot } from '@ionic-native/screenshot/ngx';

@Component({
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {

  message;
  coins;
  filePath: any;

  date = Date.now()

  constructor(private modal: ModalController, 
    private screenshot: Screenshot,
    private router: Router) { }

  ngOnInit() {
  }

  closeModal() {
    this.modal.dismiss()
    this.router.navigateByUrl('/tabs/tab1')
  }

  async shareTransaction() {
    await Share.share({
      title: 'Transaction Successful',
      text: this.message,
      url: 'https://www.euzzit.com',
      dialogTitle: 'Share Transaction',
    })
  }

  screenShot() {
    this.screenshot.save('jpg', 80).then((res) => {
      this.filePath = res.filePath;
      console.log(this.filePath);
    });
  }

}
