import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CityService {
  static URL = "https://secret-ocean-49799.herokuapp.com/https://www.metaweather.com/api/location/search/?query=";
  initializationCities : Array<any>=[]

  constructor(private http: HttpClient) { }

  getCity(name: string){
    return this.http.get(CityService.URL + name)
  }
}
