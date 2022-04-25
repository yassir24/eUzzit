
    import { HttpClient } from '@angular/common/http';
    import { Injectable } from '@angular/core';
    declare const Pusher: any;
    @Injectable()

    export class PusherServiceProvider {
      channel :any;
      constructor(public http: HttpClient) {
        Pusher.logToConsole = true;
        
      let pusher = new Pusher("5f4f05776e56fad9e930", { 
        cluster: 'eu',
        forceTLS: true
      });

      this.channel = pusher.subscribe('eusendmoney');

    }

      public init(){
       return this.channel;
      }
    }