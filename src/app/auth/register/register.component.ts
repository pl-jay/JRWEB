import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    email:    new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  submit() {
    console.log(this.registerForm)
    if (this.registerForm.valid) {
      this.submitEM.emit(this.registerForm.value);
    }
    this.auth.registerMethod(this.registerForm.value)
  }

  // tslint:disable-next-line:member-ordering
  @Output() submitEM = new EventEmitter();
}
