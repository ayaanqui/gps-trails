import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthStatus } from '../../reducers/auth.reducer';
import { Observable } from 'rxjs';
import { login } from 'src/app/actions/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";
  errorMsg: string = "";
  user: any = null;
  accessToken: string = "";
  error: boolean = false;
  success: boolean = false;
  authStatus$: Observable<AuthStatus>;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store<{ authStatus: AuthStatus }>,
  ) {
    this.authStatus$ = store.select('authStatus');
  }

  ngOnInit(): void {
    this.authStatus$.subscribe(data => {
      if (data.loggedIn) {
        this.router.navigate(['/']);
      }
    });
  }

  login() {
    this.httpClient.post<any>('http://localhost:3000/auth/login', {
        email: this.email,
        password: this.password
      }
    )
      .subscribe(
        (data: any) => {
          this.error = false;
          this.success = true;
          this.accessToken = data.access_token;
          this.user = data.user;
          
          localStorage.setItem('access_token', this.accessToken);
          localStorage.setItem('user', JSON.stringify(this.user));

          this.store.dispatch(login());
        }, 
        (error: HttpErrorResponse) => {
          this.success = false;
          this.error = true;
          this.errorMsg = error.error.message;
        }
      );
  }

}