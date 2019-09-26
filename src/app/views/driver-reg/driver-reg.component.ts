import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const URL = environment.url;


@Component({
  selector: 'app-driver-reg',
  templateUrl: './driver-reg.component.html',
  styleUrls: ['./driver-reg.component.css']
})
export class DriverRegComponent implements OnInit {

  newDriverForm: FormGroup = new FormGroup({
    driver_name: new FormControl(''),
    driver_email: new FormControl(''),
    license: new FormControl(''),
    driver_nic: new FormControl(''),
    contact_num: new FormControl('')
  });

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  submit() {
    console.log(this.newDriverForm)
    if (this.newDriverForm.valid) {
      console.log(this.newDriverForm.value);
    }
  }

}
