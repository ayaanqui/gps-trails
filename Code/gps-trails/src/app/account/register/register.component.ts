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

    this.httpClient.post<any>('http://localhost:3000/register', {
      id: 222,
      email: (<HTMLInputElement>document.getElementById('email')).value,
      password: (<HTMLInputElement>document.getElementById('password')).value,
      name: (<HTMLInputElement>document.getElementById('fullname')).value,

    }
    ).subscribe(data => {
      console.log(data);
    }
    )
  }

}
