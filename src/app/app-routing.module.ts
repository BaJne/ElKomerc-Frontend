import { AuthGuard } from './auth-guard.service';
import { UserWishListComponent } from './ui/user/user-wish-list/user-wish-list.component';
import { UserOrderHistoryComponent } from './ui/user/user-order-history/user-order-history.component';
import { UserDataComponent } from './ui/user/user-data/user-data.component';
import { UserComponent } from './ui/user/user.component';
import { HomeComponent } from './ui/home/home.component';
import { ContactComponent } from './ui/contact/contact.component';
import { ProductionComponent } from './ui/production/production.component';
import { ActivateComponent } from './ui/authentication/activate/activate.component';
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
  { path: 'products', redirectTo: '/products/all', pathMatch: 'full' },
  { path: 'login', redirectTo: '/login/sign-in', pathMatch: 'full' },

  { path: 'login', component: AuthenticationComponent, children: [
    { path: 'sign-in', component: SignInComponent},
    { path: 'sign-up', component: SignUpComponent},
    { path: 'recover', component: RecoverComponent},
    { path: 'activation', component: ActivateComponent }
  ]},
  { path: 'products', component: ProductsComponent, children: [
    { path: ':id', component: CategoryComponent},
    { path: 'product/:id', component: ProductComponent}
  ]},
  { path: 'user', canActivate: [AuthGuard], component: UserComponent, children: [
    { path: 'edit', component: UserDataComponent},
    { path: 'orders', component: UserOrderHistoryComponent},
    { path: 'wishList', component: UserWishListComponent}
  ]},
  { path: 'home', component: HomeComponent },
  { path: 'production', component: ProductionComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '/products/all' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
