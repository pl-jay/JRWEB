import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { VehicleRegComponent } from './views/vehicle-reg/vehicle-reg.component';
import { DriverRegComponent } from './views/driver-reg/driver-reg.component';
import { TripsComponent } from './views/trips/trips.component';
import { OwnerRegComponent } from './views/owner-reg/owner-reg.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PassengerConfirmedTripsComponent } from './views/passenger-confirmed-trips/passenger-confirmed-trips.component';
import { BidedTripsComponent } from './views/bided-trips/bided-trips.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'login', pathMatch: 'full', component: LoginComponent},
  { path: 'register', pathMatch: 'full', component: RegisterComponent},

  { path: 'dashboard', pathMatch: 'full', canActivate: [AuthGuardService], component: DashboardComponent},
  { path: 'vehicleReg', pathMatch: 'full', canActivate: [AuthGuardService],component: VehicleRegComponent},
  { path: 'driverReg', pathMatch: 'full', canActivate: [AuthGuardService], component: DriverRegComponent},
  { path: 'ownerReg', pathMatch: 'full', canActivate: [AuthGuardService], component: OwnerRegComponent},
  { path: 'trips', pathMatch: 'full', canActivate: [AuthGuardService], component: TripsComponent},
  { path: 'confirmed-trips', pathMatch: 'full', canActivate: [AuthGuardService], component: PassengerConfirmedTripsComponent},
  { path: 'bided-trips', pathMatch: 'full', canActivate: [AuthGuardService], component: BidedTripsComponent},

  { path: '', redirectTo: 'dashboard', canActivate: [AuthGuardService], pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
