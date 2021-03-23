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

    this.httpClient.post<any>('http://localhost:3000/users/postNewUser', { title: 'Angular POST Request Example' }).subscribe(data => {

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
