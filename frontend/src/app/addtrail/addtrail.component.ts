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
      emailid: this.email,
      name: this.name,
      parkname: this.parkname,
      trailname: this.trailname,
      experience: this.experience,
    }
    ).subscribe(data => {
      this.message = "Review submitted";
      console.log(data);
    }
    )
  }




}
