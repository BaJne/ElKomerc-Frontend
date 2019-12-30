import { AccorditionTabComponent } from './shared/components/accordition/accordition-tab/accordition-tab.component';
import { AccorditionComponent } from './shared/components/accordition/accordition.component';
import { PanelComponent } from './shared/components/panel/panel.component';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/products.service';
import { ProducerService } from './services/producer.service';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { ProductComponent } from './ui/products/product/product.component';
import { CategoryComponent } from './ui/products/category/category.component';
import { ProductsComponent } from './ui/products/products.component';
import { HeaderComponent } from './ui/header/header.component';
import { DataViewComponent } from './shared/components/data-view/data-view.component';

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
    DataViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
