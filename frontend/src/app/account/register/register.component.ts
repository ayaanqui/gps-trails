import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetailServiceClass } from '../../home/details.service';

@Injectable()
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string = "";
  fullname: string = "";
  password: string = "";
  
  errorMsg: string = "";

  error: boolean = false;
  success: boolean = false;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {}

  createMessage() {
    this.httpClient.post<any>(
      'http://localhost:3000/register', 
      {
        email: this.email,
        password: this.password,
        name: this.fullname,
      }
    ).subscribe(data => {
      this.error = false;
      this.success = true;
    }, (error: HttpErrorResponse) => {
      this.success = false;
      this.error = true;
      this.errorMsg = error.error.message;
    });
  }

}
