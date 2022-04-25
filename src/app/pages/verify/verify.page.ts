import { Component, OnInit } from '@angular/core';


export class Config {
  inputStyles?: {[key: string]: any};
  containerStyles?: {[key: string]: any};
  allowKeyCodes?: string[];
  length: number;
  allowNumbersOnly?: boolean;
  inputClass?: string;
  containerClass?: string;
  isPasswordInput?: boolean;
  disableAutoFocus?: boolean;
  placeholder?: string;
  letterCase?: 'Upper'| 'Lower';
}


@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {

  otp: string;

  config : Config = {
    allowNumbersOnly: false,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '-',
    inputStyles: {
      'width': '64px',
      'height': '64px',
      'border': '0.699999988079071px solid #C7CAD9',
        'border-radius': '4px',
        'background': '#F5F4F4'
    }
  };

  constructor() { }

  ngOnInit() {
  }

  onOtpChange(otp) {
    this.otp = otp;
  }

}
