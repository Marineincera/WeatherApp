import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/shared/models/city';
import { CityService } from 'src/app/shared/services/city.service';
import { WeatherService } from 'src/app/shared/services/weather.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  searchInput: string  = "";
  inputReceived: string = "";
  citiesReceivedArray : Array<City> = [];
  citiesNameListArray : Array<string> = [];
  citiesNameListArrayInitial : Array<string> = [];

  constructor(private cityService: CityService, private weatherService: WeatherService) { }


  ngOnInit(): void {
  }
  

  searchChange( ){
    console.log(this.searchInput)
    console.log(this.citiesNameListArray )
    //when the user begin to write
    if(this.inputReceived?.length === 0 && this.searchInput?.length > 0){
      this.inputReceived = this.searchInput;
      // Call datas from the API
      this.cityService.searchCities(this.searchInput).subscribe((data: any) => {
        //Initialize an array with datas received
        this.citiesReceivedArray = data;
        //Initialize an array with the names of the data received only
        this.citiesNameListArray = [];
        this.citiesNameListArrayInitial = [];
        //Put cities received into this array
        this.citiesReceivedArray.forEach(e => {
          this.citiesNameListArray.push(e.title.toLowerCase())
          this.citiesNameListArrayInitial.push(e.title.toLowerCase())
        })
      })
    }
    //after the first letter
    if(this.inputReceived !== this.searchInput){
        this.inputReceived = this.searchInput
        let newArray: Array<any> = []
        //Find cities correponding to the user input 
        this.citiesNameListArrayInitial.forEach((e,i) => {
          i++
          if(e.includes(this.searchInput)){
            newArray.push(e);
          }
          if(i ===  this.citiesNameListArrayInitial.length){
            this.citiesNameListArray = newArray;
          }
        })
      }
    
  }

  deleteLastLetter(){
    this.searchInput = this.inputReceived
    this.searchInput = this.searchInput?.slice(0, this.searchInput.length)
    this.searchChange()
    console.log(this.searchInput)
    console.log(this.citiesNameListArray )
  }

  selectCity(city:string){
    console.log(this.searchInput)
    console.log(this.citiesNameListArray )
    this.searchInput = city;
    this.citiesNameListArray = [];
    //Find city infos
    console.log(this.citiesReceivedArray)
    let fullcity = this.citiesReceivedArray.filter(e => (e.title).toLowerCase() == city)
    if(fullcity){
      console.log(fullcity)
      this.cityService.selectedCity.next(fullcity[0])
      this.weatherService.getWeather(fullcity[0].woeid, new Date()).subscribe((data: any) => {
        this.weatherService.selectedCityWeatherArray.next(data)
        console.log(data[0])
        this.weatherService.selectedWeather.next(data[0])
      })
    }
  }

}
