import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const URL = environment.url;

@Component({
  selector: 'app-vehicle-reg',
  templateUrl: './vehicle-reg.component.html',
  styleUrls: ['./vehicle-reg.component.css']
})

export class VehicleRegComponent implements OnInit {

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
  }

  submit() {
    console.log(this.newVehicleForm)
    if (this.newVehicleForm.valid) {
      console.log(this.newVehicleForm.value);
    }
  }


}
