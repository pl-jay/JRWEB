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

  owner_id: number;

  displayedColumns: string[] = ['driver_name', 'driver_email', 'driver_nic', 'license','contact_num'];
  dataSource: any;

  formProf: FormGroup;
  formNIC: FormGroup;
  formDL: FormGroup;

  newDriverForm: FormGroup = new FormGroup({
    driver_name: new FormControl(''),
    driver_email: new FormControl(''),
    license: new FormControl(''),
    driver_nic: new FormControl(''),
    contact_num: new FormControl(''),
    prof_pic: new FormControl(''),
    drivin_license_pic: new FormControl(''),
    driver_nic_pic: new FormControl('')
  });

  constructor(private http: HttpClient,private formBuilder: FormBuilder, private uploadService: UploadService) { }

  ngOnInit() {
    this.owner_id = parseInt(localStorage.getItem('user_id'), 10);

    this.newDriverForm.addControl('owner_id', new FormControl(''));

    this.http.get(URL + 'drivers/' + `${this.owner_id}`).subscribe((res) => {
      this.dataSource = res;
    })

    this.formProf = this.formBuilder.group({
      prof: ['']
    });
    this.formNIC = this.formBuilder.group({
      nic: ['']
    });

    this.formDL = this.formBuilder.group({
      dl: ['']
    });
  }


  //#region FILE UPLOAD

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formNIC.get('nic').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.formNIC.get('nic').value, 'driverNIC_' + this.newDriverForm.get('driver_nic').value + '.jpg');
    this.uploadService.upload(formData, this.owner_id).subscribe((res) => {
      this.newDriverForm.get('driver_nic_pic').setValue(res[`dir`]);
    });
  }

  onFileChangeDL(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file.name)
      this.formDL.get('dl').setValue(file);
    }
  }

  onSubmitDL() {
    const formData = new FormData();
    formData.append('file', this.formDL.get('dl').value, 'driverDL_' + this.newDriverForm.get('driver_nic').value + '.jpg');
    this.uploadService.upload(formData, this.owner_id).subscribe((res) => {
      this.newDriverForm.get('drivin_license_pic').setValue(res[`dir`]);
    });
  }

  onFileChangeProf(event) {
    if (event.target.files.length > 0) {
      this.formProf.get('prof').setValue(event.target.files[0]);
    }
  }

  onSubmitProf() {
    const formData = new FormData();
    formData.append('file', this.formProf.get('prof').value, 'driverDL_' + this.newDriverForm.get('driver_nic').value + '.jpg');
    this.uploadService.upload(formData, this.owner_id).subscribe((res) => {
      this.newDriverForm.get('prof_pic').setValue(res[`dir`]);
    });
  }

//#endregion


  submit() {
    this.newDriverForm.get('prof_pic').setValue('none');
    this.newDriverForm.get('owner_id').setValue(this.owner_id);



    console.log(this.newDriverForm)
    if (this.newDriverForm.valid) {
      this.http.post(URL + 'reg_driver', this.newDriverForm.value).subscribe((res) => {
        console.log(res);
      })
      console.log(this.newDriverForm.value);
    }
  }

}
