import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  static URL = "https://secret-ocean-49799.herokuapp.com/https://www.metaweather.com/api/location/";

  constructor(private http: HttpClient) { }

  getWeather(cityId: number, date:Date){
    return this.http.get(WeatherService.URL + `${cityId}/${date}`)
  }

}
