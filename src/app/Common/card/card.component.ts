import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { City } from 'src/app/shared/models/city';
import { CityService } from 'src/app/shared/services/city.service';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { DatePipe} from '@angular/common';
import { Weather } from 'src/app/shared/models/weather';
import { Router } from '@angular/router';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [DatePipe]
})
export class CardComponent implements OnInit, OnChanges {
  @Input() cityToDisplay: City| undefined = undefined;
  @Input() weather: Weather | undefined = undefined;
  @Input() homepage : boolean = true;
  weatherIconLink: string = "";

  constructor(private cityService: CityService, private weatherService: WeatherService, private datePipe: DatePipe, private router: Router,) { }

  ngOnChanges(): void{
    console.log("card changed")
    if(this.weather){
    this.transformNumbers(this.weather)   
    }
  }

  ngOnInit(): void {
    if(this.weather){
      this.getWeatherIcon(this.weather.weather_state_abbr);
      this.transformNumbers(this.weather)   
    }
 
   
  

  
  }

  getWeatherIcon(abbr: string | undefined){
    this.weatherIconLink = `https://www.metaweather.com/static/img/weather/${abbr}.svg`;
  }

  transformNumbers(weather: Weather){
    if(weather.the_temp && weather.min_temp && weather.max_temp && weather.wind_speed && weather.humidity){
      weather.the_temp = Math.floor(weather.the_temp);
      weather.min_temp = Math.floor(weather.min_temp);
      weather.max_temp = Math.floor(weather.max_temp);
      weather.wind_speed = Math.floor(weather.wind_speed);
      weather.humidity = Math.floor(weather.humidity);
      }
  }

  openCityDetails(city: City | undefined, weather: Weather| undefined){
    this.cityService.selectedCity.next(city)
    this.weatherService.selectedWeather.next(weather);
    this.router.navigate(["/city/" + city?.woeid + "/" + weather?.id]);
  }




}
