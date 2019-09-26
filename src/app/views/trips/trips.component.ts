import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogPopup } from './DialogPopup';

const URL = environment.url;

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})

export class TripsComponent implements OnInit {

  owner_id: number;

  displayedColumns: string[] = ['destination', 'date_from', 'date_to', 'no_of_passengers', 
                                'ac_condition', 'vehicle_type', 'waypoint','button' ];
  dataSource: any;
  
  budget: number;
  driver: number;

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit() {
    this.owner_id = localStorage.getItem('user_id');
    console.log(this.owner_id);

    this.http.get(URL + 'tripsby_owner/' + `${1}`).subscribe((data)=>{
      console.log(data)
      this.dataSource = data;
    })


  }

 
  openDialog(id): void {
    const dialogRef = this.dialog.open(DialogPopup, {
      data: {name: this.budget, animal: this.driver}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}



export interface PeriodicElement {
  destination: string;
  date_from: string;
  date_to: string;
  no_of_passengers: number;
  ac_condition: boolean;
  vehicle_type: string;
  waypoint: string;
}