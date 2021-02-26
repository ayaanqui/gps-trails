import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }





}
