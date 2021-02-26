import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

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

  trails: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/trails/').subscribe(res => {
      this.trails = res;
    });

    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [-119.5383, 37.8651]
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

    var marker = new mapboxgl.Marker()
      .setLngLat([-119.5383, 37.8651])
      .addTo(this.map);
  }

  namesel = " ";

  clickedItem(e: { id: number, name: string, image: string, description: string, ratingsAvg: number, views: number, lat: number, lon: number }) {

    this.map = new mapboxgl.Map({

      accessToken: environment.mapbox.accessToken,

      container: 'map',

      style: this.style,

      zoom: 8,

      center: [-119.5383, 37.8651]

    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

    var marker = new mapboxgl.Marker()
      .setLngLat([e.lon, e.lat])
      .addTo(this.map);

    this.namesel = e.name;

    this.map.flyTo({
      center: [e.lon, e.lat],
      essential: true // this animation is considered essential with respect to prefers-reduced-motion
    });
  }

}
