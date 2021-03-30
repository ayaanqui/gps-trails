import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loggedIn } from '../../reducers/auth.reducer';
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
  loggedIn$: Observable<boolean>;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store<{ loggedIn: boolean }>,
  ) {
    this.loggedIn$ = store.select('loggedIn');
  }

  ngOnInit(): void {
    if (localStorage.getItem('access_token') && localStorage.getItem('user')) {
      const userStr: any = localStorage.getItem('user');
      const user: any = JSON.parse(userStr);
      alert(`Already logged in as ${user.email} (${user.name})`);

      this.router.navigate(['/']);
    }
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