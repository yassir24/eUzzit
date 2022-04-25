import { Component, OnInit, Input } from '@angular/core';
import { ModalController, 
  // Events 
} from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.page.html',
  styleUrls: ['./iframe.page.scss'],
})
export class IframePage implements OnInit {

  @Input() externalLink : any;
  @Input() transactionRef: any;

      
  constructor(private modalController: ModalController,  private socket: Socket, 
    public events: EventsService
    ) { }

  ngOnInit() {

    console.log(this.externalLink);

    this.socket.connect();

    this.socket.emit('transRef', this.transactionRef);

    this.socket.fromEvent('fundState'+this.transactionRef).subscribe( data  => {
      let result: any = JSON.parse(data+"");

      // this.events.publish('transfer', result.amount_text);
      this.events.publish("transfer", { action: result.amount_text});


      this.modalController.dismiss({
        'dismissed': true,
        'status': result.resp_code == '00' ? true : false,
        'message': result.resp_desc,
        'amount': result.resp_code == '00' ? result.amount_text : result.amount
      });
    });
  }

  ionViewDidEnter() {

  }

  ionViewWillLeave() {
     this.socket.disconnect();
  }

  dismissModal() {
   // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true,
      'returned' : false
    });
  }

}
