import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  map?: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor() {

  }

  ngOnInit(): void {
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


  parklist: { id: number, parkname: string, imgurl: string, parkDesc: string, views: number, ratingsAvg: number, lat1: number, lng1: number }[] = [
    {
      "id": 0, parkname: "Yosemite National Park",
      imgurl: "https://www.nationalgeographic.com/content/dam/travel/2019-digital/yosemite-guide/yosemite-national-park-california.jpg"
      , parkDesc: "Beautiful destination in the world attracts speople all round the world", views: 1750, ratingsAvg: 4, lat1: 37.8651, lng1: 119.5383
    },
    { "id": 1, parkname: "Bay area national", imgurl: "https://www.apple.com/newsroom/images/product/services/lifestyle/ApplePay-and-AppleWatch-celebrate-americas-national-parks-08232018_big.jpg.large.jpg", parkDesc: "Located in the Silicon valley of United States..", views: 100130, ratingsAvg: 5, lat1: 37.8651, lng1: 119.5383 },
    { "id": 2, parkname: "Arizona reserves", imgurl: "https://studybreaks.com/wp-content/uploads/2017/07/shutterstock_142351951.jpg", parkDesc: "Beautiful destination in the world attracts speople all round the world", views: 37583, ratingsAvg: 4.5, lat1: 37.8651, lng1: 119.5383 },
    { "id": 3, parkname: "Carmel by Sea", imgurl: "https://news.harvard.edu/wp-content/uploads/2019/09/leo-serrat_unsplash-1-1600x900.jpg", parkDesc: "Beautiful destination in the world attracts speople all round the world", views: 96363, ratingsAvg: 4.5, lat1: 37.8651, lng1: 119.5383 },
  ];

  clickedItem(data: {
    id: number, parkname: string, imgurl: string, parkDesc: string,
    lat1: number, lng1: number
  }) {
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [37.8651, 119.5383],
      zoom: 8
    });
    var marker = new mapboxgl.Marker()
      .setLngLat([37.8651, 119.5383])
      .addTo(map);
  }

}
