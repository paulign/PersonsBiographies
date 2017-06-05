import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { RouterModule } from "@angular/router";

import {  routes, AppComponent, BiographiesService, PersonsListComponent, PersonBiographyComponent, LoginComponent, LoginService, SortPipe, AdminComponent, LoginGuard, ManagePersonsComponent, ManageUsersComponent, HomeComponent, SignUpComponent, ManageUserDetailsComponent, NavbarComponent, PanelComponent} from "./index";


@NgModule({
  declarations: [
    SortPipe,
    AppComponent,
    PersonsListComponent,
    PersonBiographyComponent,
    LoginComponent,
    AdminComponent,
    ManagePersonsComponent,
    ManageUsersComponent,
    HomeComponent,
    SignUpComponent,
    ManageUserDetailsComponent,
    NavbarComponent,
    PanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule, 
    RouterModule.forRoot(routes),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot()  ],
  providers: [BiographiesService, LoginService, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
