import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetailServiceClass } from '../../home/details.service';

@Injectable()
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  emailId: string = "";
  fullName: string = "";
  password: string = "";
  message?: {
    username: string,
    password: string,
    fullName: string
  };

  ngOnInit(): void {
  }
  constructor(private httpClient: HttpClient) {

  }
  createMessage() {

    console.log(this.emailId, this.fullName, this.password);

    this.httpClient.post<any>('http://localhost:3000/users/postNewUser', { 
      
      username: "user",
      password: "password",
      firstName: "",
      lastName: "",
      addedReviews: "",
      addedTrails: "",
      id: 2

     }).subscribe(data => {
      console.log(data);
    })

    /*
    console.log(this.emailId);
    return this.httpClient.post('http://localhost:3000/users/postNewUser', {
      id: 222,
      username: this.emailId,
      password: this.password,
      firstName: this.fullName,
      lastName: this.fullName,
      addedReviews: "#242",
      addedTrails: "32432"
    });
    */

  }

}
