import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe} from '@angular/common';
import { CityService } from './city.service';
import { City } from '../models/city';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  static URL = "https://secret-ocean-49799.herokuapp.com/https://www.metaweather.com/api/location/";

  constructor(private http: HttpClient, private datePipe: DatePipe, private cityService: CityService) { }

  transformDate(date: Date){
    const dateYear = this.datePipe.transform(date, 'y');
    const dateMonth = this.datePipe.transform(date, 'M');
    const dateDay = this.datePipe.transform(date, 'd');
    return `${dateYear}/${dateMonth}/${dateDay}/`
  }


  getWeather(cityId:number |undefined, date:Date){
    const dateToAsk = this.transformDate(date);
    return this.http.get(WeatherService.URL + `${cityId}/${dateToAsk}`)

  }

}
