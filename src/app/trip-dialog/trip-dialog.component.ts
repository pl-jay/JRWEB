import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';

export interface DialogData {
  budget: number;
  trip: number;
}


@Component({
  selector: 'app-trip-dialog',
  templateUrl: './trip-dialog.component.html',
  styleUrls: ['./trip-dialog.component.css']
})

export class TripDialogComponent implements OnInit {
  dialogForm: FormGroup;
  description: string;
  error: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TripDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.description = data.title;
    }

  ngOnInit() {
    this.dialogForm = this.fb.group({
      budget: ['', [Validators.required, Validators.min(2000), Validators.max(99999)]]
    });
  }

  save() {
    if (this.dialogForm.valid){
      this.dialogRef.close(this.dialogForm.value);
    } else{
      this.error = 'This is not a Valid budget';
    }
  }

  close() {
    this.dialogRef.close();
  }

}
