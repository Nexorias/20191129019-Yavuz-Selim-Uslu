import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { AlertDialogComponent } from './components/dialog/alert-dialog/alert-dialog.component';
import { AlertService } from './services/alert.service';
import { ConfirmDialogComponent } from './components/dialog/confirm-dialog/confirm-dialog.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './components/users/users.component';
import { UserDialogComponent } from './components/dialog/user-dialog/user-dialog.component';
import { ListEstatesComponent } from './components/listEstates/listEstates.component';
import { UploadimageDialogComponent } from './components/dialog/uploadimage-dialog/uploadimage-dialog.component';
import { EstateComponent } from './components/estate/estate.component';
import { EstateDialogComponent } from './components/dialog/estate-dialog/estate-dialog.component';
import { ListusersComponent } from './components/listusers/listusers.component';
import { SelectuserDialogComponent } from './components/dialog/selectuser-dialog/selectuser-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { APIService } from './services/API.service';
import { AuthInterceptor } from './services/AuthInterceptor';
import { AuthGuard } from './services/AuthGuard';
import { MainAdminComponent } from './components/admin/main-admin/main-admin.component';
import { UserpageComponent } from './components/userpage/userpage.component';
import { LocationsComponent } from './components/locations/locations.component';
import { LocationDialogComponent } from './components/dialog/location-dialog/location-dialog.component';
import { ShopsectionComponent } from './components/shopsection/shopsection.component';
import { EstatedetailsComponent } from './components/estatedetails/estatedetails.component';
import { EstateimageDialogComponent } from './components/dialog/estateimage-dialog/estateimage-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    UsersComponent,
    ListEstatesComponent,
    EstateComponent,
    LoginComponent,
    ListusersComponent,
    MainAdminComponent,
    UserpageComponent,
    LocationsComponent,
    ShopsectionComponent,
    EstatedetailsComponent,
    //dialogs
    AlertDialogComponent,
    ConfirmDialogComponent,
    UserDialogComponent,
    UploadimageDialogComponent,
    EstateDialogComponent,
    SelectuserDialogComponent,
    LocationDialogComponent,
    EstateimageDialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],


  providers: [AlertService, APIService, AuthGuard,
  {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
