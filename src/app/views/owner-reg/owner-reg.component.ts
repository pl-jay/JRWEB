import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UploadService } from '../../services/upload.service';

const URL = environment.url;


@Component({
  selector: 'app-owner-reg',
  templateUrl: './owner-reg.component.html',
  styleUrls: ['./owner-reg.component.css']
})
export class OwnerRegComponent implements OnInit {

  owner_id: number;
  current_details: any;

  formNIC: FormGroup;
  formCmpy: FormGroup;
  formReg: FormGroup;

  newOwnerForm: FormGroup = new FormGroup({
    ow_id: new FormControl(''),
    owner_name: new FormControl(''),
    owner_nic: new FormControl(''),
    contact_num: new FormControl(''),
    address: new FormControl(''),
    area: new FormControl(''),
    service_type: new FormControl(''),
    company_name: new FormControl(''),
    owner_nic_pic: new FormControl(''),
    owner_cmp_pic: new FormControl(''),
    owner_cmp_registration_doc: new FormControl('')
  });

  constructor(private http: HttpClient, private uploadService: UploadService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    
    this.owner_id = localStorage.getItem('user_id');

    console.log(this.owner_id)
    this.http.get(URL + 'owner_details/'+ `${this.owner_id}`).subscribe((res) => {
      this.current_details = res[0];
      console.log(res)
    })

    this.formNIC = this.formBuilder.group({
      nic: ['']
    });
    this.formCmpy = this.formBuilder.group({
      cmpy: ['']
    });
    this.formReg = this.formBuilder.group({
      reg: ['']
    })
  }

  //#region FILE UPLOAD

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.formNIC.get('nic').setValue(event.target.files[0]);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.formNIC.get('nic').value, 'ownerNIC_' + this.newOwnerForm.get('owner_nic').value + '.jpg');
    this.uploadService.upload(formData, this.owner_id).subscribe((res) => {
      this.newOwnerForm.get('owner_nic_pic').setValue(res[`dir`]);
    });
  }

  onFileChangeCmp(event) {
    if (event.target.files.length > 0) {
      this.formCmpy.get('cmpy').setValue(event.target.files[0]);
    } 
  }

  onSubmitCmp() {
    const formData = new FormData();
    formData.append('file', this.formCmpy.get('cmpy').value, 'ownerCMP_' + this.newOwnerForm.get('owner_nic').value + '.jpg');
    this.uploadService.upload(formData, this.owner_id).subscribe((res) => {
      this.newOwnerForm.get('owner_cmp_pic').setValue(res[`dir`]);
    });
  }

  onFileChangeReg(event) {
    if (event.target.files.length > 0) {
      this.formReg.get('reg').setValue(event.target.files[0]);
    }
  }

  onSubmitReg() {
    const formData = new FormData();
    formData.append('file', this.formReg.get('reg').value, 'ownerCmpReg_' + this.newOwnerForm.get('owner_nic').value + '.jpg');
    this.uploadService.upload(formData, this.owner_id).subscribe((res) => {
      this.newOwnerForm.get('owner_cmp_registration_doc').setValue(res[`dir`]);
    });
  }

  //#endregion

  submit() {
    this.newOwnerForm.get('ow_id').setValue(this.owner_id);
    this.http.post(URL + 'reg_owner', this.newOwnerForm.value).subscribe((res) =>{
      console.log(res);
    })
  }
}
