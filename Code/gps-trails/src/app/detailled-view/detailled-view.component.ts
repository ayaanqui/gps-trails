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
  lat: number = 51.678418;
  lng: number = 7.809007;

  selectedParkItem: any;

  searchresult: string = "Yos";
  constructor(private detailService: DetailServiceClass) {

    console.log("value is", this.detailService.selectedString);
    this.searchresult = this.detailService.selectedString;

  }

  ngOnInit() {

    this.searchresult = this.detailService.selectedString;

    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]

    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

    var marker = new mapboxgl.Marker()
      .setLngLat([51.678418, 7.809007])
      .addTo(this.map);
  }


}
