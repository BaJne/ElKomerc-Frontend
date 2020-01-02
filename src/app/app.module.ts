import { ToastComponent } from './shared/components/toast/toast.component';
import { AccorditionTabComponent } from './shared/components/accordition/accordition-tab/accordition-tab.component';
import { AccorditionComponent } from './shared/components/accordition/accordition.component';
import { PanelComponent } from './shared/components/panel/panel.component';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/products.service';
import { ProducerService } from './services/producer.service';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { ProductComponent } from './ui/products/product/product.component';
import { CategoryComponent } from './ui/products/category/category.component';
import { ProductsComponent } from './ui/products/products.component';
import { HeaderComponent } from './ui/header/header.component';
import { DataViewComponent } from './shared/components/data-view/data-view.component';
import { AuthenticationComponent } from './ui/authentication/authentication.component';
import { SignInComponent } from './ui/authentication/sign-in/sign-in.component';
import { SignUpComponent } from './ui/authentication/sign-up/sign-up.component';
import { RecoverComponent } from './ui/authentication/recover/recover.component';
import { TooltipDirective } from './shared/directives/tooltip.directive';
import { TooltipComponent } from './shared/components/tooltip/tooltip.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
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
    TooltipDirective,
    TooltipComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    ProducerService,
    ProductService,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
