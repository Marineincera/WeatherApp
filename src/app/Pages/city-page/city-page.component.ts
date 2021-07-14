import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/shared/models/city';
import { CityService } from 'src/app/shared/services/city.service';

@Component({
  selector: 'app-city-page',
  templateUrl: './city-page.component.html',
  styleUrls: ['./city-page.component.scss']
})
export class CityPageComponent implements OnInit {
  cityId : number | null = 0;
  city : City = {
    title: "City",
    location_type: "",
    woeid: 0,
    distance: 0
  }
  constructor( private route: ActivatedRoute, private router: Router,private cityService: CityService) { }

  ngOnInit(): void {
    // Get city id 
    this.cityId = Number(this.route.snapshot.paramMap.get("id"));
    //Get city infos 
    if(this.cityService.initializationCities.length > 0){
      //From city service
      this.city = this.getInfosFromService(this.cityId)
      console.log(this.city)
    } else {
      //From API
      this.getCityInfoFromApi(this.cityId)
    }


  }

 getInfosFromService(id: number){
     return this.cityService.initializationCities.find((city: City) => city.woeid === id);
  }
  
  getCityInfoFromApi(id: number) : any{
    this.cityService.getCityById(id).subscribe((cityArray: any) => {
      return this.city = cityArray
    })
  }

}
