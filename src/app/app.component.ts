import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'JRWEB';

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.auth.checkToken();
    this.auth.authenticationState.subscribe(state => {
      if (state) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['login']);
      }
    });
  }
}
