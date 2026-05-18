import { Routes } from '@angular/router';
import { Landing } from './landing/landing';
import { IndexProductos } from './index-productos/index-productos';
import { CreateProduct } from './create-product/create-product';
import { EditProductComponent } from './edit-product-component/edit-product-component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'products', component: IndexProductos },
  { path: 'products/create', component: CreateProduct },
  { path: 'products/edit/:id', component: EditProductComponent }, 
  { path: 'weather', component: WeatherForecastComponent },
  { path: '**', redirectTo: '' }, // Redirect any unmatched routes to the landing page
];
