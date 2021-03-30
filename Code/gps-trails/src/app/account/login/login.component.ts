import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";

  errorMsg: string = "";
  accessToken: string = "";

  error: boolean = false;
  success: boolean = false;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
  }

  login() {
    this.httpClient.post<any>('http://localhost:3000/auth/login', {
        email: this.email,
        password: this.password
      }
    )
      .subscribe(
        (data: {access_token: string}) => {
          this.error = false;
          this.success = true;
          this.accessToken = data.access_token;
        }, 
        (error: HttpErrorResponse) => {
          this.success = false;
          this.error = true;
          this.errorMsg = error.error.message;
        }
      );
  }

}