import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe} from '@angular/common';
import { CityService } from './city.service';
import { Weather } from '../models/weather';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  static URL = "https://secret-ocean-49799.herokuapp.com/https://www.metaweather.com/api/location/";
  initializationCitiesWeather : Array<any> = [];
  INIT_WEATHERS: Array<any> = []
  INIT_SELECTED_WEATHER: Weather | undefined = undefined;
  weathers : BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(this.INIT_WEATHERS);
  selectedWeather: BehaviorSubject<Weather | undefined > = new BehaviorSubject<Weather | undefined>(this.INIT_SELECTED_WEATHER);

  constructor(private http: HttpClient, private datePipe: DatePipe, private cityService: CityService) { }

  transformDate(date: Date){
    const dateYear = this.datePipe.transform(date, 'y');
    const dateMonth = this.datePipe.transform(date, 'M');
    const dateDay = this.datePipe.transform(date, 'd');
    return `${dateYear}/${dateMonth}/${dateDay}/`
  }


  getWeather(cityId:number |null, date:Date | string){
    if(typeof(date) !== "string"){
      const dateToAsk = this.transformDate(date);
      return this.http.get(WeatherService.URL + `${cityId}/${dateToAsk}`)
    } else {
      return this.http.get(WeatherService.URL + `${cityId}/` + date)
    }
    
  
  }

}
