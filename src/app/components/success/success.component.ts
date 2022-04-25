import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { ModalController, NavController } from "@ionic/angular";

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit {

  date;
  @Input() header: string;
  @Input() messages: string;
  @Input() coins: any;

  faCoins = faCoins;

  constructor(
    private nav: NavController,
    private modalController: ModalController
  ) {}

  async goHome() {
    await this.nav.navigateRoot("/dashboard");
    //document.location.reload();
  }

  ngOnInit() {
    this.date = new Date();
    console.log(this.date);
  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
    });

    this.goHome();
  }

}
