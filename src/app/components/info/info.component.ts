import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {

  content: any;
  header: any;

  constructor(public navParams: NavParams) {
    this.content = this.navParams.get('content');
    this.header = this.navParams.get('header');
  }

  ngOnInit() {}

}
