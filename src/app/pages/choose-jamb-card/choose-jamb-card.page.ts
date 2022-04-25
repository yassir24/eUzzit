import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BillerService } from 'src/app/services/biller.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-choose-jamb-card',
  templateUrl: './choose-jamb-card.page.html',
  styleUrls: ['./choose-jamb-card.page.scss'],
})
export class ChooseJambCardPage implements OnInit {

  airtimeData: [];
  loaded = false;
  list: any;

  constructor(public modalController: ModalController,
    private events: EventsService,
    public billerService: BillerService
    ) { }

  ngOnInit() {
    this.billerService
      .getJambBillers({ service_id: 27 })
      .subscribe((response) => {
        console.log(response);
        let jambList = [];

        for (var i = 0; i < response.data.products.length; ++i) {
          const data = {
            name: response.data.products[i].name,
            amount: response.data.products[i].amount,
            code: response.data.products[i].code,
            image: response.data.service.image,
          };
          jambList.push(data);
        }

        console.log(jambList);

        this.list = jambList;
        console.log(this.list);
      });
  }  


  closeModal() {
    this.modalController.dismiss()
  }


  async setAirtimeProvider(biller) {
    await this.events.publish('setjambprovider', {service_id: biller});
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
