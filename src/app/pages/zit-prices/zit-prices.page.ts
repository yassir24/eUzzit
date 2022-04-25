import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../providers/config';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';
import { EventsService } from 'src/app/services/events.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-zit-prices',
  templateUrl: './zit-prices.page.html',
  styleUrls: ['./zit-prices.page.scss'],
})
export class ZitPricesPage implements OnInit {

  prices: any;

  constructor(
    private http: HttpClient, 
    public config: Config, 
    private modal: ModalController,
    public events: EventsService,
    public storage: Storage
  ) { }

  ngOnInit() {
    return this.http.get<any>(`${this.config.api_url}/user/zit-purchase/price`).subscribe(res=>{
      console.log(res)
      this.prices = res.data
    });
  }


  async selectPrice(price) {
    await this.events.publish('selectprice', {price});
    this.modal.dismiss();
  }

  closeModal() {
    this.modal.dismiss()
  }

 


}
