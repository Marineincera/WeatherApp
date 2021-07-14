import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/shared/models/city';
import { Weather } from 'src/app/shared/models/weather';
import { CityService } from 'src/app/shared/services/city.service';
import { WeatherService } from 'src/app/shared/services/weather.service';

@Component({
  selector: 'app-city-page',
  templateUrl: './city-page.component.html',
  styleUrls: ['./city-page.component.scss']
})
export class CityPageComponent implements OnInit {
  cityId : number | null = Number(this.route.snapshot.paramMap.get("cityId"));
  weatherId : number | null = null;
  city : City | undefined = undefined;
  weather: Weather | undefined = undefined;
  weathersArray : Array<any> | undefined = undefined;
  dateIncrementation = 0;
  constructor( private route: ActivatedRoute, private router: Router,private cityService: CityService, private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getCityInfos(Number(this.route.snapshot.paramMap.get("cityId")))
    this.getWeatherInfo(Number(this.route.snapshot.paramMap.get("cityId")))
  console.log("reinit")

  }

  getCityInfos(id: number){
    if(this.cityService.selectedCity){
      this.cityService.selectedCity.subscribe((data:any) => {
        this.city = data
      })
    }
   if(!this.city){
      //From API
      this.cityService.selectedCity.next(this.getCityInfoFromApi(id))
      this.cityService.selectedCity.subscribe((data: any) => {
        this.city = data
      })
    }
  }

  
  getCityInfoFromApi(id: number) : any{
    this.cityService.getCityById(id).subscribe((cityArray: any) => {
      return this.city = cityArray
    })
  }

  getWeatherInfo(id: number){
    this.getWeatherInfosFromData(id, new Date())
    }
  

 getWeatherInfosFromData(id: number | null, date: Date ){
  this.weatherService.getWeather(id, date).subscribe((data: Weather |any) => {
    this.weathersArray = []
    this.weatherService.selectedWeather.next(data[0])
    this.weatherService.selectedWeather.subscribe((data) => {
      this.weather = data
      console.log(this.weather)
    })
    // this.weather = data[0]
    for (let i = 1; i < 6; i++){
      this.weathersArray?.push(data[i])
    }
  })
 }

dateBefore(date : Date){
  let m = new Date()
  this.dateIncrementation = this.dateIncrementation - 1
  m.setDate(m.getDate() + this.dateIncrementation);
  this.getWeatherInfosFromData(this.cityId, m)
}

dateAfter(date : Date){
  let m = new Date()
  this.dateIncrementation = this.dateIncrementation + 1
  m.setDate(m.getDate() + this.dateIncrementation);
  this.getWeatherInfosFromData(this.cityId, m)
}

}
