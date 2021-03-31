import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthStatus } from './reducers/auth.reducer';
import { login } from 'src/app/actions/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  title = 'gps-trails';

  constructor(
    private store: Store<{ authStatus: AuthStatus }>
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('access_token') && localStorage.getItem('user')) {
      this.store.subscribe(data => {
        if (!data.authStatus.loggedIn) {
          this.store.dispatch(login());
          return;
        }
      });
    }
  }

}
