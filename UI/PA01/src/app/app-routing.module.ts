import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { EstateComponent } from './components/estate/estate.component';
import { ListEstatesComponent } from './components/listEstates/listEstates.component';
import { ListusersComponent } from './components/listusers/listusers.component';
import { LoginComponent } from './components/login/login.component';
import { MainAdminComponent } from './components/admin/main-admin/main-admin.component';
import { AuthGuard } from './services/AuthGuard';
import { UserpageComponent } from './components/userpage/userpage.component';
import { LocationsComponent } from './components/locations/locations.component';
import { ShopsectionComponent } from './components/shopsection/shopsection.component';
import { EstatedetailsComponent } from './components/estatedetails/estatedetails.component';

const routes: Routes = [
{
  path: 'home',
  component :HomeComponent,
},
{
  path: '',
  component :HomeComponent,
},
{
  path: 'users',
  component :UsersComponent,
  canActivate: [AuthGuard],
  data:{
    perms: ["Admin"],
    back: '/home'
  },
},
{
  path: 'estates',
  component :EstateComponent,
  canActivate: [AuthGuard],
  data:{
    perms: ["Admin"],
    back: '/home'
  },
},
{
  path: 'listestates/:UserId',
  component :ListEstatesComponent,
},
{
  path: 'listeusers/:EstateId',
  component :ListusersComponent,
},
{
  path:'estatedetails/:EstateId',
  component: EstatedetailsComponent,
},
{
  path: 'login',
  component :LoginComponent,
},
{
  path: 'admin',
  component :MainAdminComponent,
  canActivate: [AuthGuard],
  data:{
    perms: ["Admin"],
    back: '/home'
  },
},
{
  path: 'userpage',
  component :UserpageComponent,
  canActivate: [AuthGuard],
  data:{
    perms: ["User","Admin"],
    back: '/login'
  },
},
{
  path: 'locations',
  component :LocationsComponent,
  canActivate: [AuthGuard],
  data:{
    perms: ["Admin"],
    back: '/login'
  },
},
{
  path: 'shop',
  component :ShopsectionComponent,
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
