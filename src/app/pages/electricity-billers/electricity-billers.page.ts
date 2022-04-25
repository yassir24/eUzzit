import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BillerService } from 'src/app/services/biller.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-electricity-billers',
  templateUrl: './electricity-billers.page.html',
  styleUrls: ['./electricity-billers.page.scss'],
})
export class ElectricityBillersPage implements OnInit {

  airtimeData: [];
  loaded = false;

  billers: any;
  billers2: any;

  constructor(public modalController: ModalController,
    private events: EventsService,
    public billerService: BillerService
    ) { }

  ngOnInit() {

    
     // compute first call to airvend 4 is mobile recharge
     this.billerService.getElectricityBillers().subscribe(
      (data) => {
        console.log("This is where the biller is oh", data);
        this.billers = data.data;
        this.billers2 = this.sortBillers();

        // for (const iterator of data.wallet) {
        //   if (iterator.slug !== "shoppy") {
        //     this.wallets.push(iterator);
        //   }
        // }
      },
      (error) => {
        console.log(error);
      }
    );
  } 
  
  
  sortBillers() {
    let billers = [];
    if (typeof this.billers === "object") {
      console.log("this is working", this.billers);
      this.billers.forEach((element) => {
        let location = element.name.split(" ")[0];
        let type = element.name.split(" ")[1];
        location = location.toLowerCase();
        type = type.toLowerCase();

        console.log(location, type);

        let cont = true;

        if (billers.length < 1) {
          let obj = {
            name: null,
            prepaid: null,
            postpaid: null,
            image: element.image,
          };
          obj.name = location;
          obj[type] = element.id;

          billers.push(obj);
        } else {
          for (let elem of billers) {
            if (elem.name == location) {
              elem[type] = element.id;
              cont = false;
            }
          }

          if (cont) {
            let obj = {
              name: null,
              prepaid: null,
              postpaid: null,
              image: element.image,
            };

            obj.name = location;
            obj[type] = element.id;

            billers.push(obj);
          }
        }
      });
    }

    console.log(billers);
    return billers;
  }


  closeModal() {
    this.modalController.dismiss()
  }


  async setAirtimeProvider(electricity) {
    await this.events.publish('setelectricityprovider', {service_id:electricity});
  }

  changeTitle(electricity) {
    this.setAirtimeProvider(electricity).then(()=>{
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
