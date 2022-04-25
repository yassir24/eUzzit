import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BillerService } from 'src/app/services/biller.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-internet-billers',
  templateUrl: './internet-billers.page.html',
  styleUrls: ['./internet-billers.page.scss'],
})
export class InternetBillersPage implements OnInit {

  airtimeData: [];
  loaded = false;

  constructor(public modalController: ModalController,
    private events: EventsService,
    public billerService: BillerService
    ) { }

  ngOnInit() {
     // compute first call to airvend 4 is mobile recharge
     this.billerService.getInternetBillers().subscribe((res) => {
      console.log('this are the data billers',res);
      this.airtimeData = res.data;
      this.airtimeData.pop();
      this.loaded = true;
    });
  }  


  closeModal() {
    this.modalController.dismiss()
  }


  async setAirtimeProvider(title, service_id, cat) {
    await this.events.publish('setdataprovider', {service_id: service_id, title, cat});
  }

  changeTitle(title: string, service_id: number, cat) {
    this.setAirtimeProvider(title, service_id, cat).then(()=>{
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
