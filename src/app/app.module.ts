import { TabsComponent } from './shared/components/tabs/tabs.component';
import { TabComponent } from './shared/components/tabs/tab/tab.component';

import { ToastComponent } from './shared/components/toast/toast.component';
import { AccorditionTabComponent } from './shared/components/accordition/accordition-tab/accordition-tab.component';
import { AccorditionComponent } from './shared/components/accordition/accordition.component';
import { PanelComponent } from './shared/components/panel/panel.component';

// Primeface components
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputMaskModule} from 'primeng/inputmask';

import { ProductService } from './services/products.service';
import { ProducerService } from './services/producer.service';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { DropDownComponent } from './shared/components/drop-down/drop-down.component';
import { DataTableComponent } from './shared/components/data-table/data-table.component';
import { ActivateComponent } from './ui/authentication/activate/activate.component';

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
    SpinnerComponent,
    DropDownComponent,
    DataTableComponent,
    TabComponent,
    TabsComponent,
    ActivateComponent
  ],
  imports: [
    AutoCompleteModule,
    InputMaskModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ProducerService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
