import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { RouterModule } from "@angular/router";
import { routes } from "./app.routes";

import { AppComponent } from './app.component';
import { BiographiesService } from './shared/biographies.service';
import { PersonsListComponent } from './persons-list/persons-list.component';
import { PersonBiographyComponent } from './person-biography/person-biography.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './shared/login.service';
import { SortPipe } from './shared/sort.pipe';
import { AdminComponent } from './admin/admin.component';
import { LoginGuard } from './shared/login-guard.service';
import { ManagePersonsComponent } from './admin/manage-persons/manage-persons.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ManageUserDetailsComponent } from './admin/manage-users/manage-user-details/manage-user-details.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PanelComponent } from './panel/panel.component';

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
