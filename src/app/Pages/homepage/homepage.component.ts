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
  // city = "London"
  cities=["Paris", "Bordeaux", "Toulouse", "Lyon"]
  citiesToDisplay: City | any = [];
  weathersToDisplay: Weather | any = [];
  weatherIconLink: string = "";
  

constructor(private cityService: CityService, private weatherService: WeatherService, private datePipe: DatePipe, private router: Router) { }

  ngOnInit(): void {
    this.getInitializationCitiesDatas(this.cities)
  }



  getInitializationCitiesDatas(cities: Array<string>){

    if(this.cityService.initializationCities.length === 0){
      cities.forEach((city, i) => {
        i++
        // Get city details and id for each city
        this.cityService.getCity(city).subscribe((data: City | any) => {
          //Put these infos into an array in the city service
          this.cityService.initializationCities.push(data[0])
          // Get weather details for each city
          this.weatherService.getWeather(data[0].woeid, new Date()).subscribe((data: Weather | any) => {
            //Put these infos into an array in the weather service
            this.weatherService.initializationCitiesWeather.push(data[0])
          })
        })
        if(i === this.cities.length){
          this.citiesToDisplay = this.cityService.initializationCities;
          this.weathersToDisplay = this.weatherService.initializationCitiesWeather;
        }
      })
    }else {
      this.citiesToDisplay = this.cityService.initializationCities;
      this.weathersToDisplay = this.weatherService.initializationCitiesWeather;
    }
  }






}
