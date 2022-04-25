import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-bill-payments',
  templateUrl: './bill-payments.page.html',
  styleUrls: ['./bill-payments.page.scss'],
})
export class BillPaymentsPage implements OnInit {
  userprofile: any;
  constructor( public storage: Storage,) { 
     this.getUser()
  

    
  }

  async getUser() {
   this.userprofile = await this.storage.get("user");
  }


  ngOnInit() {
  }

}
