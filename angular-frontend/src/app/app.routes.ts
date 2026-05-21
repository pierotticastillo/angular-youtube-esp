import { Routes } from '@angular/router';
import { Landing } from './landing/landing';
import { IndexProductos } from './index-productos/index-productos';
import { CreateProduct } from './create-product/create-product';
import { EditProductComponent } from './edit-product-component/edit-product-component';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'products', component: IndexProductos },
  { path: 'products/create', component: CreateProduct },
  { path: 'products/edit/:id', component: EditProductComponent },
  { path: '**', redirectTo: '' },
];
