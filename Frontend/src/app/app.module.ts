import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertyListComponent } from './Property/Components/property-list/property-list.component';
import { NavbarComponent } from './Shared/Components/navbar/navbar.component';
import { HousingService } from './Services/housing.service';
import { AddPropertyComponent } from './Property/Components/add-property/add-property.component';
import { PropertyDetailsComponent } from './Property/Components/property-details/property-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './User/Components/user-login/user-login.component';
import { UserRegisterComponent } from './User/Components/user-register/user-register.component';
import { PropertyCardComponent } from './Property/Components/property-card/property-card.componet';
import { FilterPipe } from './Property/Pipes/filter.pipe';
import { SortPipe } from './Property/Pipes/sort.pipe';


@NgModule({
  declarations: [
    AppComponent,
    PropertyCardComponent,
    PropertyListComponent,
    NavbarComponent,
    AddPropertyComponent,
    PropertyDetailsComponent,
    UserLoginComponent,
    UserRegisterComponent,
    FilterPipe,
    SortPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
  ],
  providers: [
    HousingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
