import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { BillerService } from 'src/app/services/biller.service';
import { EventsService } from 'src/app/services/events.service';
import { SelectProductCablePage } from '../select-product-cable/select-product-cable.page';

@Component({
  selector: 'app-select-biller-airtime',
  templateUrl: './select-biller-airtime.page.html',
  styleUrls: ['./select-biller-airtime.page.scss'],
})
export class SelectBillerAirtimePage implements OnInit {

  cabletvs: any;
  loaded: boolean = false;

  constructor(
    public billerService: BillerService,
    private router: Router,
    private modalcontroller: ModalController,
    private toastController: ToastController,
    private events: EventsService
  ) { }

  ngOnInit() {
    this.billerService.getCableTvBillers().subscribe(res => {
      console.log(res.data)
      this.cabletvs = res.data;
      this.loaded = true;
     });
  }

  async setCableProvider(service) {
    await this.events.publish('setcableprovider', {service: service});
  }




  selectProvider(service: any) {
    this.setCableProvider(service).then(()=>{
      this.modalcontroller.dismiss().then(async ()=>{
    const modal = await this.modalcontroller.create({
      component: SelectProductCablePage,
      componentProps: { 
        cabledata: service
      }
    });
    return await modal.present();
  })
    })
  
 
}

closeModal() {
  this.modalcontroller.dismiss()
}

  openService( service: any) {
    this.modalcontroller.dismiss()
    // if(!service.active)
    // {
    //   this.presentToast('Coming Soon!');

    //   return;
    // }
    let navigationExtras: NavigationExtras = {
      state: {
        cable: service
      }
    };
    this.router.navigate(['select-product-cable'], navigationExtras);
  }

  async presentToast( error: string ) {
    const toast = await this.toastController.create({
      message: error,
      duration: 5000
    });
    toast.present();
  }

}
