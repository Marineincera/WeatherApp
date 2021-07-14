import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { City } from 'src/app/shared/models/city';
import { Weather } from 'src/app/shared/models/weather';
import { CityService } from 'src/app/shared/services/city.service';

declare var require: any;

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  @Input() weatherArray : Array<Weather> |undefined= [];
  tempDatas : Array<number>= [];
  dateDatas : Array<any> = [];
  public options: any = {
    Chart: {
      type: 'area',
      height: 700
    },
    title: {
      text: 'Temperature evolution'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: this.dateDatas,
      tickmarkPlacement: 'on',
      title: {
          enabled: false
      }
  },
    series: [{
      name: 'Temp',
      data: this.tempDatas
  }]
  }
  constructor(private cityService: CityService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    if(this.weatherArray && this.weatherArray?.length > 0){
      this.weatherArray.forEach((e) => {
        if(typeof (e.the_temp) === "number"){
          let f = Math.floor(e.the_temp)
          this.tempDatas.push(f)
        }
        this.dateDatas.push(this.datePipe.transform(e.created, 'shortTime'))
        console.log(e.created)
      })
     
    
      Highcharts.chart('charts-container', this.options);
    }
    
  }



}
