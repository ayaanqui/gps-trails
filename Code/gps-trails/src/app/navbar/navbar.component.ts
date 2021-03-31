import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthStatus } from '../reducers/auth.reducer';
import { logout } from '../actions/auth.action';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  authStatus$: Observable<AuthStatus>;
  authStatus?: AuthStatus;

  constructor(
    private store: Store<{ authStatus: AuthStatus }>
  ) { 
    this.authStatus$ = store.select('authStatus');
  }

  ngOnInit(): void {
    this.authStatus$.subscribe(data => {
      if (data.loggedIn)
        this.authStatus = {...data};
    });
  }

  clickLogout() {
    this.store.dispatch(logout());

    this.store.subscribe(data => {
      this.authStatus = data.authStatus;
    });
  }

}
