import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.page.html',
  styleUrls: ['./user-settings.page.scss'],
})
export class UserSettingsPage implements OnInit {
  userprofile: any;

  constructor(
    public storage: Storage,
    private iab: InAppBrowser,
    private router: Router
  ) { }

 async ngOnInit() {
  this.userprofile = await this.storage.get("user");
  }


  goHelp() {
    this.router.navigateByUrl('/help')
  }
  goSetting() {
    this.router.navigateByUrl('/security-settings')
  }
  goEditprofile() {
    this.router.navigateByUrl('/edit-profile')
  }

  goFaq() {
    this.iab.create("https://www.euzzit.com/index");
  }

}
