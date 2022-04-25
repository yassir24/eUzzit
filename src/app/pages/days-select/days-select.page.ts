import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventsService } from 'src/app/services/events.service';
import { Config } from '../../providers/config';


@Component({
  selector: 'app-days-select',
  templateUrl: './days-select.page.html',
  styleUrls: ['./days-select.page.scss'],
})
export class DaysSelectPage implements OnInit {

  constructor(private modal: ModalController, 
    private http: HttpClient, 
    public config: Config,
    public events: EventsService) { }

  ngOnInit() {
    return this.http.get<any>(`${this.config.api_url}/user/zit-purchase/price`).subscribe(res=>{
      console.log(res)
      // this.prices = res.data
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
