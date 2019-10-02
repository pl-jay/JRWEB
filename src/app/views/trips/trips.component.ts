import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { TripDialogComponent } from '../../trip-dialog/trip-dialog.component';



const URL = environment.url;

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})

export class TripsComponent implements OnInit {

  owner_id: number;

  displayedColumns: string[] 
  = ['destination', 'date_from', 'date_to','pickup_time', 'no_of_passengers', 
    'ac_condition', 'vehicle_type', 'waypoint','button' ];
  dataSource: any;
  budget: number;

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit() {
    this.owner_id = localStorage.getItem('user_id');
    console.log(this.owner_id);

    this.http.get(URL + 'tripsby_owner/' + `${this.owner_id}`).subscribe((data) => {
      console.log(data)
      this.dataSource = data;
    })


  }

  openDialog(tripId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: tripId,
      title: 'Assign Budget'
    }

    const dialogRef = this.dialog.open(TripDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data) => {
        const newBudget = {
          trip_id: tripId,
          budget: data[`budget`],
          owner_id: this.owner_id,
          ts_id: null
        }
        console.log(newBudget)
        this.http.post(URL + 'sendBudget', newBudget).subscribe((res) => {
          console.log(res);
        })
      });
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