import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const URL = environment.url;

@Component({
  selector: 'app-bided-trips',
  templateUrl: './bided-trips.component.html',
  styleUrls: ['./bided-trips.component.css']
})
export class BidedTripsComponent implements OnInit {

  owner_id: number;
  bidedTrips: any;

  displayedColumns: string[]  = ['destination', 'date_from', 'date_to', 'pickup_time', 'no_of_passengers', 
    'ac_condition', 'vehicle_type', 'waypoint', 'button' ];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.owner_id = parseInt(localStorage.getItem('user_id'), 10);

    this.http.get(URL + 'ownerbidedtrips/' + `${this.owner_id}`).subscribe((res) => {
      this.bidedTrips = res;
      console.log(this.bidedTrips)
    })
  }

}
