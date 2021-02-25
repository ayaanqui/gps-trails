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

  selectedParkItem: {
    id: number, parkname: string, imgurl: string, parkDesc: string,
    lat1: number, lng1: number
  } = {
      id: 1, parkname: "knk", imgurl: "", parkDesc: "",
      lat1: 0.0, lng1: 0.0
    };

  searchresult: string = "Yos";
  constructor(private detailService: DetailServiceClass) {
    this.detailService.detailComponentEmitter.subscribe(
      item => this.selectedItem(item)
    );
  }

  ngOnInit(): void {
    this.detailService.detailComponentEmitter.subscribe(
      item => this.selectedItem(item)
    );

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

  selectedItem(selected: string) {
    this.searchresult = selected;
  }


}
