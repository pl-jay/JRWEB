import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }



  submit() {
    console.log(this.loginForm)
    if (this.loginForm.valid) {
      this.submitEM.emit(this.loginForm.value);

      this.auth.loginMethod(this.loginForm.value);
    }
  }

  // tslint:disable-next-line:member-ordering
  @Input() error: string | null;

  // tslint:disable-next-line:member-ordering
  @Output() submitEM = new EventEmitter();

}
