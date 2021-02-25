import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit, Output, EventEmitter } from '@angular/core';
import { data } from './trails.json';
import { DetailServiceClass } from './details.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: []
})
export class HomeComponent implements OnInit {
  trails: any;
  searchList: any;
  searchresult: string = "";

  constructor(private detailService: DetailServiceClass, private http: HttpClient) {
    this.trails = data;
  }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/trails/').subscribe(res => {
      this.trails = res;
      this.searchList = res;
      this.detailService.parklist = this.trails;
    });
  }

  searchThis() {
    this.searchList = this.detailService.parklist.filter(
      item => item.name.toLowerCase().includes(this.searchresult.toLowerCase())
    );
  }

  goToTrials(e: any) {
    this.detailService.selectedString = e;

    //this.detailService.emitItemSelected("Yosemite park");
  }

}
