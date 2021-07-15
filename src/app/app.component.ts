import { Component } from '@angular/core';
import { City } from './shared/models/city';
import { Weather } from './shared/models/weather';
import { CityService } from './shared/services/city.service';
import { WeatherService } from './shared/services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weatherapp';
  cities=["Paris", "Bordeaux", "Toulouse", "Lyon"]
  constructor(private cityService: CityService, private weatherService: WeatherService ) { }


  ngOnInit(){
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
          this.cityService.cities.next(this.cityService.initializationCities)
          this.weatherService.weathers.next(this.weatherService.initializationCitiesWeather)
        }
      })
    }else{
      this.cityService.cities.next(this.cityService.initializationCities)
      this.weatherService.weathers.next(this.weatherService.initializationCitiesWeather)
    }
  }
}
