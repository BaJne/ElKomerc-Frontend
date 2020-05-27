import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  sales: any;
  orderStatistic: any;
  constructor() { }

  ngOnInit(): void {
    this.sales = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [

        {
            label: 'Broj prodaja',
            data: [28, 48, 40, 19, 86, 27, 90],
            borderColor: '#565656'
        },
        {
            label: 'Prihod',
            data: [100000 , 89000, 60000, 55000, 86000, 48000, 120000],
            borderColor: '#4bc0c0'
        }
      ]
    };
    this.orderStatistic = {
      labels: ['U obradi', 'Pristigli', 'Odradjeni'],
      datasets: [
          {
              data: [300, 50, 100],
              backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56'
              ],
              hoverBackgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56'
              ]
          }]
      };
  }

}
