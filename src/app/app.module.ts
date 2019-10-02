import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VehicleRegComponent } from './views/vehicle-reg/vehicle-reg.component';
import { DriverRegComponent } from './views/driver-reg/driver-reg.component';
import { OwnerRegComponent } from './views/owner-reg/owner-reg.component';
import { TripsComponent } from './views/trips/trips.component';
import { LoaderComponent } from './views/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from './services/loader.service';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './services/loader.interceptors';

import { SidenavComponent } from './sidenav/sidenav.component';
import { TripDialogComponent } from '../app/trip-dialog/trip-dialog.component';

import { LayoutModule } from '@angular/cdk/layout';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    DashboardComponent,
    VehicleRegComponent,
    DriverRegComponent,
    LoginComponent,
    OwnerRegComponent,
    TripsComponent,
    LoaderComponent,
    SidenavComponent,
    TripDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    LayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  entryComponents: [TripDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
