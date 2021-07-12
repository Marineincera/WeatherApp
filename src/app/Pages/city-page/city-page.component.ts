import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-city-page',
  templateUrl: './city-page.component.html',
  styleUrls: ['./city-page.component.scss']
})
export class CityPageComponent implements OnInit {

  constructor( private route: ActivatedRoute, private router: Router,) { }

  ngOnInit(): void {
    // Get city id 
    const id = this.route.snapshot.paramMap.get("id");
  }

}
