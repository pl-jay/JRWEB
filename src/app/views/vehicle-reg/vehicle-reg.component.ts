import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UploadService } from 'src/app/services/upload.service';

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

  owner_id: number;
  drivers: any;

  formVIns: FormGroup;
  formVrl: FormGroup;
  formVfront: FormGroup;
  formVrear: FormGroup;
  formVin: FormGroup;

  displayedColumns: string[] = ['vehicle_reg_number', 'vehicle_type', 'vehicle_brand', 'no_of_passengers','ac_condition'];
  dataSource: any;

  newVehicleForm: FormGroup = new FormGroup({
    vehicle_reg: new FormControl(''),
    ac_condition: new FormControl(''),
    v_brand: new FormControl(''),
    v_type: new FormControl(''),
    capacity: new FormControl(''),
    insurance: new FormControl(''),
    driver_id: new FormControl(''),
    owner_id: new FormControl(''),
    vehicle_insu_pic: new FormControl(''),
    vehicle_incomdoc_pic: new FormControl(''),
    vehicle_front_pic: new FormControl(''),
    vehicle_rear_pic: new FormControl(''),
    vehicle_inside_pic: new FormControl(''),
  });

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private uploadService: UploadService) { }

  ngOnInit() {
    this.owner_id = localStorage.getItem('user_id');

    this.http.get(URL + 'drivers/' + `${this.owner_id}`).subscribe((res) => {
      console.log(res);
      this.drivers = res;
    })

    this.http.get(URL+'get_vehicleby_owner/'+`${this.owner_id}`).subscribe((res)=>{
      this.dataSource = res;
      console.log(res)
    });

    //#region FILE FORMS

    this.formVIns = this.formBuilder.group({
      ins: ['']
    });
    this.formVrl = this.formBuilder.group({
      vrl: ['']
    });
    this.formVfront = this.formBuilder.group({
      vfront: ['']
    });
    this.formVrear = this.formBuilder.group({
      vrear: ['']
    });
    this.formVin = this.formBuilder.group({
      vin: ['']
    });

    //#endregion
  }

  submit() {
    this.newVehicleForm.get('owner_id').setValue(this.owner_id);
    if (this.newVehicleForm.valid) {
      this.http.post(URL + 'reg_vehicle', this.newVehicleForm.value).subscribe((res)=>{
        console.log(res);
      })
      console.log(this.newVehicleForm.value);
    }
  }

  //#region FILE UPLOAD

  onFileChangeVIns(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formVIns.get('ins').setValue(file);
    }
  }

  onSubmitVIns() {
    const formData = new FormData();
    formData.append('file', this.formVIns.get('ins').value, 'vehicle_Ins' + this.newVehicleForm.get('vehicle_reg').value + '.jpg');
    this.uploadService.upload(formData, this.owner_id).subscribe((res) => {
      this.newVehicleForm.get('vehicle_insu_pic').setValue(res[`dir`]);
    });
  }

  onFileChangeVrl(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formVrl.get('vrl').setValue(file);
    }
  }

  onSubmitVrl() {
    const formData = new FormData();
    formData.append('file', this.formVrl.get('vrl').value, 'vehicle_Vrl' + this.newVehicleForm.get('vehicle_reg').value + '.jpg');
    this.uploadService.upload(formData, this.owner_id).subscribe((res) => {
      this.newVehicleForm.get('vehicle_incomdoc_pic').setValue(res[`dir`]);
    });
  }

  onFileChangeVfront(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formVfront.get('vfront').setValue(file);
    }
  }

  onSubmitVfront() {
    const formData = new FormData();
    formData.append('file', this.formVfront.get('vfront').value, 'vehicle_front' + this.newVehicleForm.get('vehicle_reg').value + '.jpg');
    this.uploadService.upload(formData, this.owner_id).subscribe((res) => {
      this.newVehicleForm.get('vehicle_front_pic').setValue(res[`dir`]);
    });
  }

  onFileChangeVrear(event) {
    if (event.target.files.length > 0) {
      this.formVrear.get('vrear').setValue(event.target.files[0]);
    }
  }

  onSubmitVrear() {
    const formData = new FormData();
    formData.append('file', this.formVrear.get('vrear').value, 'vehicle_rear' + this.newVehicleForm.get('vehicle_reg').value + '.jpg');
    this.uploadService.upload(formData, this.owner_id).subscribe((res) => {
      this.newVehicleForm.get('vehicle_rear_pic').setValue(res[`dir`]);
    });
  }

  onFileChangeVin(event) {
    if (event.target.files.length > 0) {
      this.formVin.get('vin').setValue(event.target.files[0]);
    }
  }

  onSubmitVin() {
    const formData = new FormData();
    formData.append('file', this.formVin.get('vin').value, 'vehicle_in' + this.newVehicleForm.get('vehicle_reg').value + '.jpg');
    this.uploadService.upload(formData, this.owner_id).subscribe((res) => {
      this.newVehicleForm.get('vehicle_inside_pic').setValue(res[`dir`]);
    });
  }

//#endregion


}
