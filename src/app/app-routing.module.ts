import { SignInComponent } from './ui/authentication/sign-in/sign-in.component';
import { SignUpComponent } from './ui/authentication/sign-up/sign-up.component';
import { RecoverComponent } from './ui/authentication/recover/recover.component';
import { AuthenticationComponent } from './ui/authentication/authentication.component';
import { ProductComponent } from './ui/products/product/product.component';
import { CategoryComponent } from './ui/products/category/category.component';
import { ProductsComponent } from './ui/products/products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/products/all', pathMatch: 'full' },
  { path: 'login', redirectTo: '/login/sign-in', pathMatch: 'full' },
  { path: 'login', component: AuthenticationComponent, children: [
    { path: 'sign-in', component: SignInComponent},
    { path: 'sign-up', component: SignUpComponent},
    { path: 'recover', component: RecoverComponent}
  ]},
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
