import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { DatePipe} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './Pages/homepage/homepage.component';
import { CityPageComponent } from './Pages/city-page/city-page.component';
import { CardComponent } from './Common/card/card.component';
import { ChartsComponent } from './Common/charts/charts.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CityPageComponent,
    CardComponent,
    ChartsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
