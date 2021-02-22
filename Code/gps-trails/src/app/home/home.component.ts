import { Component, OnInit } from '@angular/core';
import {data} from './trails.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  trails: Array<any>;

  constructor() { 
    this.trails = data;
  }

  ngOnInit(): void {
  }

}
