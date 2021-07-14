import { DatePipe } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { City } from 'src/app/shared/models/city';
import { Weather } from 'src/app/shared/models/weather';
import { CityService } from 'src/app/shared/services/city.service';
import { WeatherService } from 'src/app/shared/services/weather.service';


declare var require: any;

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit, OnChanges {
  @Input() weatherArray : Array<Weather> |undefined= undefined;
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
  constructor(private cityService: CityService, private datePipe: DatePipe, private weatherService: WeatherService) { }

  ngOnChanges(){
    console.log("charts changement")
    this.initDatas()


  }


  ngOnInit(): void {
    this.initDatas()
    console.log("charts init")



  }

  initDatas(){
   
if(this.weatherArray && this.weatherArray.length > 0){
  console.log(this.weatherArray)
      this.weatherArray.forEach((e) => {
        if(typeof (e.the_temp) === "number"){
          let f = Math.floor(e.the_temp)
          if(this.tempDatas.length === 5){
            this.tempDatas= []
            this.tempDatas.push(f)
          }else{
            console.log(this.tempDatas)
            this.tempDatas.push(f)
          }
          
        }
        if(this.dateDatas.length === 5){
          this.dateDatas = [];
          this.dateDatas.push(this.datePipe.transform(e.created, 'shortTime'))
          this.dateDatas = this.dateDatas.reverse()
        } else {
          this.dateDatas.push(this.datePipe.transform(e.created, 'shortTime'))
          this.dateDatas = this.dateDatas.reverse()
        }
      })
    }
    if(this.dateDatas.length > 0){
      Highcharts.chart('charts-container', this.options);
    }

  }


}
