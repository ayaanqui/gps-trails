import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import {data} from './trails.json';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  trails: any;

  constructor(private http:HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/trails/').subscribe(res => {
      this.trails = res;
    });
  }

}
