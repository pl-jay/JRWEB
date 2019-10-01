import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { MatSidenav } from '@angular/material';



@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  isLogged = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  // tslint:disable-next-line:variable-name
  constructor(private breakpointObserver: BreakpointObserver, private _auth: AuthService) {}

  ngOnInit() {
    if (localStorage.getItem('token')) {
      console.log(this._auth.authenticationState.value)
      this.isLogged = true;
    } else {
      console.log(this._auth.authenticationState.value)
      this.isLogged = false;
    }
  }

  logout() {
    this._auth.logoutMethod();
  }
}
