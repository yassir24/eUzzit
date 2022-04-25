import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-monthly-pension',
  templateUrl: './monthly-pension.page.html',
  styleUrls: ['./monthly-pension.page.scss'],
})
export class MonthlyPensionPage implements OnInit {

  res: any;

  constructor(
    private router: Router
    ) { }

   ngOnInit() {
   
  }

  accessLoan() {
    this.router.navigateByUrl('/access-loan')
  }


}
