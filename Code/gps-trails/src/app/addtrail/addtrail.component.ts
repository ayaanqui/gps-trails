import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-addtrail',
  templateUrl: './addtrail.component.html',
  styleUrls: ['./addtrail.component.css']
})
export class AddtrailComponent implements OnInit {

  email: string = '';
  name: string = '';
  parkname: string = ""
  trailname: string = '';
  experience: string = '';
  message: string = "";
  responsemessage: string = "";

  constructor(private httpClient: HttpClient) {
    this.email = '';
    this.trailname = '';
  }

  ngOnInit(): void {
  }


  createMessage() {

    this.httpClient.post<any>('http://localhost:3000/addtrails/add', {
      id: 222,
      emailid: (<HTMLInputElement>document.getElementById('emailInputId')).value,
      name: (<HTMLInputElement>document.getElementById('nameInputId')).value,
      parkname: (<HTMLInputElement>document.getElementById('parknameInputId')).value,
      trailname: (<HTMLInputElement>document.getElementById('trailInputId')).value,
      experience: (<HTMLInputElement>document.getElementById('experienceInputId')).value,
    }
    ).subscribe(data => {
      this.message = "Review submitted";
      console.log(data);
    }
    )
  }




}
