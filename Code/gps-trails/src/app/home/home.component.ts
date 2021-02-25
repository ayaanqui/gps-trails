import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { data } from './trails.json';
import { DetailServiceClass } from './details.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DetailServiceClass]
})
export class HomeComponent implements OnInit {
  trails: Array<any>;

  parklist: {
    id: number, parkname: string, imgurl: string, parkDesc: string,
    lat1: number, lng1: number
  }[] = [

    ];
  searchList: {
    id: number, parkname: string, imgurl: string, parkDesc: string,
    lat1: number, lng1: number
  }[] = [{
    "id": 0, parkname: "",
    imgurl: ""
    , parkDesc: "", lat1: 0.0, lng1: 0.0
  }];

  searchresult: string = "wefew";

  constructor(private detailService: DetailServiceClass) {
    this.parklist = detailService.parklist;
    this.trails = data;
  }

  ngOnInit(): void {
  }

  searchThis() {
    this.searchList = this.parklist.filter(
      item => item.parkname.toLowerCase().startsWith(this.searchresult.toLowerCase())
    );


  }

  goToTrials(e: {
    id: number, parkname: string, imgurl: string, parkDesc: string,
    lat1: number, lng1: number
  }) {
    this.detailService.emitItemSelected(this.searchresult);
  }

}
