import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyListComponent } from './Property/property-list/property-list.component';
import { AddPropertyComponent } from './Property/add-property/add-property.component';
import { PropertyDetailsComponent } from './Property/property-details/property-details.component';
import { UserLoginComponent } from './User/Components/user-login/user-login.component';
import { UserRegisterComponent } from './User/Components/user-register/user-register.component';

const routes: Routes = [
  {path:'' , component:PropertyListComponent},
  {path:'add-property',component:AddPropertyComponent},
  {path:'property-detail/:id',component:PropertyDetailsComponent},
  {path:'rent-property',component:PropertyListComponent},
  {path:'user/login',component:UserLoginComponent},
  {path:'user/register', component:UserRegisterComponent},
  {path:'**',component:PropertyListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
