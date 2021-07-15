import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/shared/models/city';
import { Weather } from 'src/app/shared/models/weather';
import { CityService } from 'src/app/shared/services/city.service';
import { WeatherService } from 'src/app/shared/services/weather.service';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  cities=["Paris", "Bordeaux", "Toulouse", "Lyon"]
  citiesToDisplay: City | any = [];
  weathersToDisplay: Weather | any = [];
  weatherIconLink: string = "";
  

constructor(private cityService: CityService, private weatherService: WeatherService, private datePipe: DatePipe, private router: Router) { }

  ngOnInit(): void {
    this.cityService.cities.subscribe((data: any) => {
      this.citiesToDisplay= data})
    this.weatherService.weathers.subscribe((data:any) => {
      this.weathersToDisplay = data
    })
  }





}
