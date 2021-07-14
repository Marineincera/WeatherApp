import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { City } from '../models/city';


@Injectable({
  providedIn: 'root'
})
export class CityService {
  static URL = "https://secret-ocean-49799.herokuapp.com/https://www.metaweather.com/api/location/";
  initializationCities : Array<any>=[];
  INIT_CITIES: Array<any> = []
  INIT_SELECTED_CITY: City | undefined = undefined;
  cities : BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(this.INIT_CITIES);
  selectedCity: BehaviorSubject<City | undefined > = new BehaviorSubject<City | undefined>(this.INIT_SELECTED_CITY);

  constructor(private http: HttpClient) { }

  getCity(name: string | null){
    return this.http.get(CityService.URL + "search/?query=" + name)
  }

  getCityById(id: number){
    return this.http.get(CityService.URL + id)
  }
}
