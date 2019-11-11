import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import {UserService} from '@app/_services';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.less']
})
export class BarChartComponent implements OnInit {

  transaction: any;

  constructor(private userService: UserService) {
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [], label: 'Amount'}
  ];


  ngOnInit() {
    this.userService.getTransaction().subscribe(res => {
      this.transaction = res;
      for (let i of this.transaction){
        this.barChartLabels.push(i.datetime);
        this.barChartData[0].data.push(i.amount);
      }
      }, error => console.log(error));

  }

}
