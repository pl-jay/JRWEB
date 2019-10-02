import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UploadService } from '../../services/upload.service';

const URL = environment.url;

export interface Drivers {
  driver_name: string;
  driver_email: string;
  driver_nic: string;
  license: string;
  contact_num: number;
}


@Component({
  selector: 'app-driver-reg',
  templateUrl: './driver-reg.component.html',
  styleUrls: ['./driver-reg.component.css']
})
export class DriverRegComponent implements OnInit {

  displayedColumns: string[] = ['driver_name', 'driver_email', 'driver_nic', 'license','contact_num'];
  dataSource: any;
  form: FormGroup;
  newDriverForm: FormGroup = new FormGroup({
    driver_name: new FormControl(''),
    driver_email: new FormControl(''),
    license: new FormControl(''),
    driver_nic: new FormControl(''),
    contact_num: new FormControl(''),
    prof_pic: new FormControl('')
  });

  constructor(private http: HttpClient,private formBuilder: FormBuilder, private uploadService: UploadService) { }

  ngOnInit() {
    this.newDriverForm.addControl('owner_id', new FormControl(''));
    this.http.get(URL + 'drivers/'+`${1}`).subscribe((res)=>{
      this.dataSource = res;
      console.log(res);
    })

    this.form = this.formBuilder.group({
      avatar: ['']
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
     // file.name = 'driver_1';
      console.log(file.name)
      this.form.get('avatar').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    const i = 1;
    formData.append('file', this.form.get('avatar').value,'driver_' + i + '.jpg');
    this.uploadService.upload(formData, 1);
  }

  submit() {
    this.newDriverForm.get('prof_pic').setValue('none');
    this.newDriverForm.get('owner_id').setValue(1);



    console.log(this.newDriverForm)
    if (this.newDriverForm.valid) {
      this.http.post(URL+'reg_driver',this.newDriverForm.value).subscribe((res)=>{
        console.log(res);
      })
      console.log(this.newDriverForm.value);
    }
  }

}
