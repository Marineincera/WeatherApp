import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  // city = "London"
  cities=["Paris", "Bordeaux", "Toulouse", "Lyon"]

  constructor() { }

  ngOnInit(): void {
  }

}
