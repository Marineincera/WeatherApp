import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityPageComponent } from './Pages/city-page/city-page.component';
import { HomepageComponent } from './Pages/homepage/homepage.component';

const routes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "homepage", component: HomepageComponent },

  { path: "city/:cityId/:weatherId", component: CityPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
