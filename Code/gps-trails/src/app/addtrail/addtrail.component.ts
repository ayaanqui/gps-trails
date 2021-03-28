import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-addtrail',
  templateUrl: './addtrail.component.html',
  styleUrls: ['./addtrail.component.css']
})
export class AddtrailComponent implements OnInit {

  email: string = "";
  name: string = "";
  parkname: string = ""
  trailname: string = "";
  experience: string = "";

  responsemessage: string = "";

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }


  createMessage() {

    this.httpClient.post<any>('http://localhost:3000/addtrails/add', {
      id: 222,
      emailid: "wrgsf",
      name: "Adfwe",
      parkname: "sdfref",
      trailname: "sdfsfsfs",
      experience: "#242",
    }
    ).subscribe(data => {
      console.log(data);
    }
    )
  }




}
