import { Component, Input, OnInit } from '@angular/core';
import { City } from 'src/app/shared/models/city';
import { CityService } from 'src/app/shared/services/city.service';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { DatePipe} from '@angular/common';
import { Weather } from 'src/app/shared/models/weather';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [DatePipe]
})
export class CardComponent implements OnInit {
  @Input() cityInput: string ="City";
  cityToDisplay: City = {
    title: "City",
    location_type: "",
    woeid: 0,
    distance: 0
  }
  weatherToDisplay : Weather = {
    id: 0,
    applicable_date: new Date(),
    weather_state_name: "",
    weather_state_abbr: "",
    wind_speed: 0,
    wind_direction: 0,
    wind_direction_compass: "",
    min_temp: 0,
    max_temp: 0,
    the_temp:0,
    air_pressure: 0,
    humidity: 0,
    visibility: 0,
    predictability: 0,
    created: new Date()
  }
weatherIconLink: string = "";

  constructor(private cityService: CityService, private weatherService: WeatherService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.cityService.getCity(this.cityInput).subscribe((data: any) => {
        this.cityToDisplay = data[0]
        this.weatherService.getWeather(this.cityToDisplay.woeid, this.weatherToDisplay.applicable_date).subscribe((data: any) => {
          this.weatherToDisplay = data[0]
          this.getWeatherIcon(data[0].weather_state_abbr)
          
        })
      })
  }

  getWeatherIcon(abbr: string){
    this.weatherIconLink = `https://www.metaweather.com/static/img/weather/${abbr}.svg`;
  }

}
