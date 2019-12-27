import { ProductComponent } from './products/product/product.component';
import { CategoryComponent } from './products/category/category.component';
import { ProductsComponent } from './products/products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/products/all', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent, children: [
    { path: ':id', component: CategoryComponent},
    { path: 'product/:id', component: ProductComponent}
  ]},
  { path: '**', redirectTo: '/products/all' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
