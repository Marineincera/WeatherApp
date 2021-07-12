import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './Pages/homepage/homepage.component';
import { CityPageComponent } from './Pages/city-page/city-page.component';
import { CardComponent } from './Common/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CityPageComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
