import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AssignDriverDialogComponent } from 'src/app/assign-driver-dialog/assign-driver-dialog.component';

const URL = environment.url;

@Component({
  selector: 'app-passenger-confirmed-trips',
  templateUrl: './passenger-confirmed-trips.component.html',
  styleUrls: ['./passenger-confirmed-trips.component.css']
})
export class PassengerConfirmedTripsComponent implements OnInit {

  owner_id: number;
  confirmedTrips: any;

  displayedColumns: string[]
  = ['destination', 'date_from', 'date_to', 'pickup_time', 'no_of_passengers', 
    'ac_condition', 'vehicle_type', 'waypoint' ];

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit() {
    this.owner_id = parseInt(localStorage.getItem('user_id'), 10);

    this.http.get(URL + 'passengerconfirmedtrips/' + `${this.owner_id}`).subscribe((res) => {
      console.log(res);
      this.confirmedTrips = res;
      console.log(this.confirmedTrips)
    })
  }

}

export interface PeriodicElement {
  destination: string;
  date_from: string;
  date_to: string;
  pickup_time: string;
  no_of_passengers: number;
  ac_condition: boolean;
  vehicle_type: string;
  waypoint: string;
}
