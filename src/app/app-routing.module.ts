import { AdminOrdersComponent } from './ui/admin/admin-orders/admin-orders.component';
import { AuthGuard } from './auth-guard.service';
import { ActivateComponent } from './ui/authentication/activate/activate.component';
import { SignInComponent } from './ui/authentication/sign-in/sign-in.component';
import { SignUpComponent } from './ui/authentication/sign-up/sign-up.component';
import { RecoverComponent } from './ui/authentication/recover/recover.component';
import { AuthenticationComponent } from './ui/authentication/authentication.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './ui/main/main.component';
import { CategoryComponent } from './ui/main/category/category.component';
import { ProductComponent } from './ui/main/product/product.component';
import { UserComponent } from './ui/main/user/user.component';
import { UserDataComponent } from './ui/main/user/user-data/user-data.component';
import { UserPasswordComponent } from './ui/main/user/user-password/user-password.component';
import { UserOrderHistoryComponent } from './ui/main/user/user-order-history/user-order-history.component';
import { UserWishListComponent } from './ui/main/user/user-wish-list/user-wish-list.component';
import { HomeComponent } from './ui/main/home/home.component';
import { ProductionComponent } from './ui/main/production/production.component';
import { ContactComponent } from './ui/main/contact/contact.component';
import { OrderComponent } from './ui/main/order/order.component';
import { CartComponent } from './ui/main/cart/cart.component';
import { AdminGuard } from './ui/admin/admin-guard.service';
import { AdminComponent } from './ui/admin/admin.component';
import { AdminDashboardComponent } from './ui/admin/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'login', redirectTo: '/login/sign-in', pathMatch: 'full' },
  { path: 'user', redirectTo: '/user/edit', pathMatch: 'full' },

  { path: 'admin', component: AdminComponent, children: [
    { path: 'dashboard', component: AdminDashboardComponent},
    { path: 'orders', component: AdminOrdersComponent}
  ]},
  { path: 'login', component: AuthenticationComponent, children: [
    { path: 'sign-in', component: SignInComponent},
    { path: 'sign-up', component: SignUpComponent},
    { path: 'recover', component: RecoverComponent},
    { path: 'activation', component: ActivateComponent }
  ]},
  { path: '', component: MainComponent, children: [
    { path: 'products', component: CategoryComponent},
    { path: 'product/:id', component: ProductComponent},
    { path: 'home', component: HomeComponent },
    { path: 'production', component: ProductionComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'cart', component: CartComponent },
    { path: 'order', canActivate: [AuthGuard], component: OrderComponent },
    { path: 'user', canActivate: [AuthGuard], component: UserComponent, children: [
      { path: 'edit', component: UserDataComponent},
      { path: 'password-change', component: UserPasswordComponent},
      { path: 'orders', component: UserOrderHistoryComponent},
      { path: 'wishList', component: UserWishListComponent}
    ]},
  ]},
  { path: '**', redirectTo: '/products' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
