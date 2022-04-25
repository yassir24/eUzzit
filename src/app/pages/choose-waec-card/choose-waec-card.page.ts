import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BillerService } from 'src/app/services/biller.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-choose-waec-card',
  templateUrl: './choose-waec-card.page.html',
  styleUrls: ['./choose-waec-card.page.scss'],
})
export class ChooseWaecCardPage implements OnInit {

  airtimeData: [];
  loaded = false;
  list: any;

  constructor(public modalController: ModalController,
    private events: EventsService,
    public billerService: BillerService
    ) { }

  ngOnInit() {
    this.billerService
    .getJambBillers({ service_id: 25 })
    .subscribe((response) => {
      console.log(response);
      const data = {
        amount: response.data.products.amount,
        name: response.data.service.name,
        image: response.data.service.image,
      };
      this.list = [data];
      console.log(this.list);
    });
  }  


  closeModal() {
    this.modalController.dismiss()
  }


  async setAirtimeProvider(biller) {
    await this.events.publish('setwaecprovider', {service_id: biller});
  }

  abs(n: number) {
    return Math.abs(n).toLocaleString("en-US");
  }

  changeTitle(biller) {
    this.setAirtimeProvider(biller).then(()=>{
      this.closeModal()
    })
  //  console.log(service_id)

  // this.setAirtimeProvider()

    // this.billerService.getISAirtimePaymentItems(billerid).subscribe(data => {
    //   //  console.log(data);
    //   this.paymentitems = data.paymentitems;
    //   this.itemsloaded = true;
    //   // get payment code of specify amount as default
    //   let payitem: any;
    //   payitem = data.paymentitems.find((x: { paymentitemname: any; }) => x.paymentitemname.includes('Top up'));
    //   if (billerid === 901) {
    //     /// Airtel(901) has a different default...
    //     payitem = data.paymentitems.find((x: { paymentitemname: any; }) => x.paymentitemname.includes('Top-up'));
    //   }

    //   this.buyAirtimeForm.patchValue({
    //     networkid: billerid,
    //     paymentcode: payitem.paymentCode
    //   });

    // });
  }

}
