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

  parklist: {
    id: number, parkname: string, imgurl: string, parkDesc: string,
    lat1: number, lng1: number
  }[] = [
      {
        "id": 0, parkname: "Yosemite National Park",
        imgurl: "https://www.nationalgeographic.com/content/dam/travel/2019-digital/yosemite-guide/yosemite-national-park-california.jpg"
        , parkDesc: "Beautiful destination in the world attracts speople all round the world", lat1: 37.8651, lng1: 119.5383
      },
      { "id": 1, parkname: "Acadia", imgurl: "https://www.apple.com/newsroom/images/product/services/lifestyle/ApplePay-and-AppleWatch-celebrate-americas-national-parks-08232018_big.jpg.large.jpg", parkDesc: "Located in the Silicon valley of United States..", lat1: 12.44, lng1: 34.23 },
      { "id": 2, parkname: "Arches", imgurl: "https://studybreaks.com/wp-content/uploads/2017/07/shutterstock_142351951.jpg", parkDesc: "Beautiful destination in the world attracts speople all round the world", lat1: 14.271, lng1: 170.1322 },
      { "id": 3, parkname: "Badlands", imgurl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/BadlandsView3.jpg/400px-BadlandsView3.jpg", parkDesc: "Beautiful destination in the world attracts speople", lat1: 102.33, lng1: 43.85 },

    ];

  namesel = " ";

  clickedItem(e: {
    id: number, parkname: string, imgurl: string, parkDesc: string,
    lat1: number, lng1: number
  }) {

    this.map = new mapboxgl.Map({

      accessToken: environment.mapbox.accessToken,

      container: 'map',

      style: this.style,

      zoom: 8,

      center: [e.lng1, e.lat1]

    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

    var marker = new mapboxgl.Marker()
      .setLngLat([e.lng1, e.lat1])
      .addTo(this.map);

    this.namesel = e.parkname;

    this.map.flyTo({
      center: [e.lng1, e.lat1],
      essential: true // this animation is considered essential with respect to prefers-reduced-motion
    });
  }

}
