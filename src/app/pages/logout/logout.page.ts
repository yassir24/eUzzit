import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(
    public auth: AuthenticationService,
    private modal: ModalController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  cancelModal() {
    return this.modal.dismiss()
  }

  async runlogout() {
    console.log("login-out2");
    this.router.navigateByUrl("/login");
    this.modal.dismiss()
    return await this.auth.logout();
  }

}
