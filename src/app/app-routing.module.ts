import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewProductComponent} from './new-product/new-product.component';
import {ProductsComponent} from './products/products.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path : "", redirectTo: "home", pathMatch: "full"},
  {path : "home", component: HomeComponent},
  {path : "products", component: ProductsComponent},
  {path : "newProduct", component: NewProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
