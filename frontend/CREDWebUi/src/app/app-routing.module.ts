import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'dell', component: HomeComponent },
  { path: 'second-component', component: ManageProductsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
