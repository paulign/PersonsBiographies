import { Routes } from "@angular/router";
import { PersonsListComponent, PersonBiographyComponent, LoginComponent, SignUpComponent, AdminComponent, ManagePersonsComponent, HomeComponent, LoginGuard } from "./index";


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