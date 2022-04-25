import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-zit-status',
  templateUrl: './zit-status.page.html',
  styleUrls: ['./zit-status.page.scss'],
})
export class ZitStatusPage implements OnInit {
  status: any;
  name: any = "myname"

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.page) {
        this.status = params.page;
      }
    })
  }

}
