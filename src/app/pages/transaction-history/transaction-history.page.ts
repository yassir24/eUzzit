import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Config } from '../../providers/config';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.page.html',
  styleUrls: ['./transaction-history.page.scss'],
})
export class TransactionHistoryPage implements OnInit {

  res;
  id;
  content: string;
  item: any;
  name: any;

  constructor(
    private http: HttpClient, 
    private pdfGenerator: PDFGenerator,
    private modalController: ModalController,
    private toastController: AlertController,
    public config: Config
  ) { }

  ngOnInit() {
    return this.http.post<any>(`${this.config.api_url}/user/loans/transactions`, {loan_id: this.item.loan_id}).subscribe(res=>{
      this.res = res.message
      this.name = res.data.full_name
      console.log('this is the res', this.res)
    }, error => {
      return this.presentToast(error)
    } )
  }

  async presentToast(error: any) {
    const toast = await this.toastController.create({
      header: 'Error',
      message: error.error.message,
      // buttons: ['Disagree', 'Agree'],
    });
    toast.present();
  }

  closeModal() {
    this.modalController.dismiss()
  }

  downloadInvoice() {
    this.content = document.getElementById('PrintInvoice').innerHTML;
    let options = {
      documentSize: 'A4',
      type: 'share',
      // landscape: 'portrait',
      fileName: 'eUzzit-transaction.pdf'
    };
    this.pdfGenerator.fromData(this.content, options)
      .then((base64) => {
        console.log('OK', base64);
      }).catch((error) => {
        console.log('error', error);
      });

  }

}
