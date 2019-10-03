import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';

export interface DialogData {
  driver: number;
  trip_status: number;
}


@Component({
  selector: 'app-assign-driver-dialog',
  templateUrl: './assign-driver-dialog.component.html',
  styleUrls: ['./assign-driver-dialog.component.css']
})
export class AssignDriverDialogComponent implements OnInit {

  dialogForm: FormGroup;
  description: string;
  drivers: any;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AssignDriverDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.description = data.title;
      this.drivers = data.drivers;
    }

  ngOnInit() {
    this.dialogForm = this.fb.group({
      driver: ['', [Validators.required]]
    });
  }

  save() {
    this.dialogRef.close(this.dialogForm.value);
  }

  close() {
    this.dialogRef.close();
  }
}