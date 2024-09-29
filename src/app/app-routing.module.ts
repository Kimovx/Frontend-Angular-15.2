import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';

const routes: Routes = [
  // Defualt Path Redirect To Home Path
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  // Path To Home Component
  {
    path: 'home',
    // loadComponent: ()=> import('./Components/home/home.component').then(m => m.HomeComponent)
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
