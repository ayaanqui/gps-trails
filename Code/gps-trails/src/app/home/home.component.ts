import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { data } from './trails.json';
import { DetailServiceClass } from './details.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: []
})
export class HomeComponent implements OnInit {
  trails: Array<any>;


  searchList: any;
  searchresult: string = "";
  constructor(private detailService: DetailServiceClass) {
    this.trails = data;
  }

  ngOnInit(): void {
  }

  searchThis() {

    this.searchList = this.detailService.parklist.filter(
      item => item.parkname.toLowerCase().startsWith(this.searchresult.toLowerCase())
    );
  }

  goToTrials(e: any) {
    this.detailService.selectedString = e;

    //this.detailService.emitItemSelected("Yosemite park");
  }

}
