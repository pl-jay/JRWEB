import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const URL = environment.url;


@Component({
  selector: 'app-owner-reg',
  templateUrl: './owner-reg.component.html',
  styleUrls: ['./owner-reg.component.css']
})
export class OwnerRegComponent implements OnInit {

  current_details: any;
  nic_image: File;

  newOwnerForm: FormGroup = new FormGroup({
    owner_name: new FormControl(''),
    owner_nic: new FormControl(''),
    contact_num: new FormControl(''),
    address: new FormControl(''),
    area: new FormControl(''),
    service_type: new FormControl(''),
    company_name: new FormControl('')
  });

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(URL + 'owner_details/'+`${2}`).subscribe((res)=>{
      this.current_details = res[0];
      console.log(res)
    })
  }

  submit() {
    console.log(this.newOwnerForm)
    if (this.newOwnerForm.valid) {
      console.log(this.newOwnerForm.value);
    }
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.nic_image = file;
      console.log('TRUE CASE',this.nic_image)
    } else {
      console.log('ELSE CASE',event);
    }
  }



}
