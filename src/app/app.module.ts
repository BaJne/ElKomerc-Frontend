import { TabsComponent } from './shared/components/tabs/tabs.component';
import { TabComponent } from './shared/components/tabs/tab/tab.component';

import { ToastComponent } from './shared/components/toast/toast.component';
import { AccorditionTabComponent } from './shared/components/accordition/accordition-tab/accordition-tab.component';
import { AccorditionComponent } from './shared/components/accordition/accordition.component';
import { PanelComponent } from './shared/components/panel/panel.component';
import { GalleryComponent } from './shared/components/gallery/gallery.component';

// Primeface components
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputMaskModule} from 'primeng/inputmask';
import {SpinnerModule} from 'primeng/spinner';
import {SidebarModule} from 'primeng/sidebar';
import {CarouselModule} from 'primeng/carousel';
import {DropdownModule} from 'primeng/dropdown';
import {PaginatorModule} from 'primeng/paginator';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';
import {StepsModule} from 'primeng/steps';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {PanelMenuModule} from 'primeng/panelmenu';
import {AccordionModule} from 'primeng/accordion';
import {TooltipModule} from 'primeng/tooltip';
import {PanelModule} from 'primeng/panel';
import {ChartModule} from 'primeng/chart';

import { ProducerService } from './services/producer.service';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { HeaderComponent } from './ui/header/header.component';
import { DataViewComponent } from './shared/components/data-view/data-view.component';
import { AuthenticationComponent } from './ui/authentication/authentication.component';
import { SignInComponent } from './ui/authentication/sign-in/sign-in.component';
import { SignUpComponent } from './ui/authentication/sign-up/sign-up.component';
import { RecoverComponent } from './ui/authentication/recover/recover.component';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { DropDownComponent } from './shared/components/drop-down/drop-down.component';
import { DataTableComponent } from './shared/components/data-table/data-table.component';
import { ActivateComponent } from './ui/authentication/activate/activate.component';
import { CarouselComponent } from './shared/components/carousel/carousel.component';
import { CardComponent } from './shared/components/card/card.component';
import { LoadAnimationComponent } from './shared/components/load-animation/load-animation.component';
import { UserPasswordComponent } from './ui/main/user/user-password/user-password.component';
import { UserOrderHistoryComponent } from './ui/main/user/user-order-history/user-order-history.component';
import { UserWishListComponent } from './ui/main/user/user-wish-list/user-wish-list.component';
import { UserDataComponent } from './ui/main/user/user-data/user-data.component';
import { UserComponent } from './ui/main/user/user.component';
import { ContactComponent } from './ui/main/contact/contact.component';
import { ProductionComponent } from './ui/main/production/production.component';
import { HomeComponent } from './ui/main/home/home.component';
import { ProductComponent } from './ui/main/product/product.component';
import { CategoryComponent } from './ui/main/category/category.component';
import { MainComponent } from './ui/main/main.component';
import { OrderComponent } from './ui/main/order/order.component';
import { CartComponent } from './ui/main/cart/cart.component';
import { AdminComponent } from './ui/admin/admin.component';
import { AdminDashboardComponent } from './ui/admin/admin-dashboard/admin-dashboard.component';
import { AdminOrdersComponent } from './ui/admin/admin-orders/admin-orders.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    CategoryComponent,
    ProductComponent,
    PanelComponent,
    AccorditionComponent,
    AccorditionTabComponent,
    DataViewComponent,
    ToastComponent,
    AuthenticationComponent,
    SignInComponent,
    SignUpComponent,
    RecoverComponent,
    SpinnerComponent,
    DropDownComponent,
    DataTableComponent,
    TabComponent,
    TabsComponent,
    ActivateComponent,
    GalleryComponent,
    CarouselComponent,
    HomeComponent,
    ProductionComponent,
    ContactComponent,
    UserComponent,
    UserDataComponent,
    UserWishListComponent,
    UserOrderHistoryComponent,
    UserPasswordComponent,
    CardComponent,
    LoadAnimationComponent,
    OrderComponent,
    CartComponent,
    AdminComponent,
    AdminDashboardComponent,
    SidebarComponent,
    AdminOrdersComponent
  ],
  imports: [
    AutoCompleteModule,
    StepsModule,
    TooltipModule,
    ToggleButtonModule,
    CarouselModule,
    AccordionModule,
    PanelMenuModule,
    PanelModule,
    ScrollPanelModule,
    CheckboxModule,
    InputMaskModule,
    TableModule,
    DropdownModule,
    OverlayPanelModule,
    PaginatorModule,
    SidebarModule,
    SpinnerModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ChartModule
  ],
  providers: [
    ProducerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
