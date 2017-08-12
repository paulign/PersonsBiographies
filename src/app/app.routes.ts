import { Routes } from "@angular/router";
import { PersonsListComponent } from './persons-list/persons-list.component';
import { PersonBiographyComponent } from './person-biography/person-biography.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component'
import { AdminComponent } from './admin/admin.component';
import { ManagePersonsComponent } from './admin/manage-persons/manage-persons.component';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from './shared/login-guard.service';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    },
    { path: "home", component: HomeComponent },
    { path: "persons", component: PersonsListComponent },
    { path: "persons/:id", component: PersonBiographyComponent},
    { path: "login", component: LoginComponent},
    { path: "signup", component: SignUpComponent},
    { path: "admin", component: AdminComponent, canActivate: [LoginGuard], children: [
                    {
                        path: "",
                        children: [
                            { path: "persons", component: ManagePersonsComponent },
                            { path: "persons/:id", component: ManagePersonsComponent },
                            { path: "", redirectTo: "persons", pathMatch: "full" }
                        ]
                    }
                ]}
    
];