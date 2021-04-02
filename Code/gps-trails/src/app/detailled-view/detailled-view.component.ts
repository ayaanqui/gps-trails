import { Component, OnInit } from '@angular/core';
import { DetailServiceClass } from '../home/details.service';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-detailled-view',
  templateUrl: './detailled-view.component.html',
  styleUrls: ['./detailled-view.component.css'],
  providers: []
})
export class DetailledViewComponent implements OnInit {

  map?: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat: number;
  lng: number;

  selectedParkItem: any;

  searchresult: string = "Yos";
  subtrialsList: any;

  constructor(private detailService: DetailServiceClass) {

    this.selectedParkItem = this.detailService.selectedString;
    this.searchresult = this.selectedParkItem.name;
    this.subtrialsList = this.selectedParkItem.subtrails;
    this.lat = this.selectedParkItem.latitude;
    this.lng = this.selectedParkItem.longitude;
  }

  ngOnInit() {

    this.selectedParkItem = this.detailService.selectedString;
    this.lat = this.selectedParkItem.latitude;
    this.lng = this.selectedParkItem.longitude;
    this.searchresult = this.selectedParkItem.name;
    this.subtrialsList = this.detailService.selectedString.subtrails;

    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      zoom: 8,
      center: [-119.56619, 37.73195]

    });
    console.log("coordindates are :" + this.detailService.selectedString.longitude);
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

    var marker = new mapboxgl.Marker()
      .setLngLat([-119.56619, 37.73195])
      .addTo(this.map);
  }


  goToSubTrials(trail: {
    name: string, reviewsTrial: number, noOfReview: number, length: number, latitude: number, longitude: number,
    time: number, image: string, images: any, path: any, difficulty: string, description: string, routetype: string, elevationgain: number,
    reviews: any
  }) {
    this.detailService.selectedSubTrail = trail;
  }

}
