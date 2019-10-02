import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const URL = environment.url;

export interface Drivers {
  vehicle_reg_number: string;
  vehicle_type: string;
  vehicle_brand: string;
  no_of_passengers: number;
  ac_condition: boolean;
}

@Component({
  selector: 'app-vehicle-reg',
  templateUrl: './vehicle-reg.component.html',
  styleUrls: ['./vehicle-reg.component.css']
})

export class VehicleRegComponent implements OnInit {

  displayedColumns: string[] = ['vehicle_reg_number', 'vehicle_type', 'vehicle_brand', 'no_of_passengers','ac_condition'];
  dataSource: any;

  newVehicleForm: FormGroup = new FormGroup({
    vehicle_reg: new FormControl(''),
    ac_condition: new FormControl(''),
    v_brand: new FormControl(''),
    v_type: new FormControl(''),
    capacity: new FormControl(''),
    insurance: new FormControl('')
  });

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(URL+'get_vehicleby_owner/'+`${1}`).subscribe((res)=>{
      this.dataSource = res;
      console.log(res)
    })
  }

  submit() {
    console.log(this.newVehicleForm)
    if (this.newVehicleForm.valid) {
      this.http.post(URL + 'reg_vehicle', this.newVehicleForm.value).subscribe((res)=>{
        console.log(res);
      })
      console.log(this.newVehicleForm.value);
    }
  }


}
