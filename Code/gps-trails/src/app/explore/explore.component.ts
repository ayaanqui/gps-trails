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

    var map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [-119.5383, 37.8651]
    });
    // Add map controls
    map.addControl(new mapboxgl.NavigationControl());

    var popup = new mapboxgl.Popup()
      .setText("Yosemite National Park")
      .addTo(map);

    var marker = new mapboxgl.Marker()
      .setLngLat([-119.5383, 37.8651]).setPopup(popup)
      .addTo(map);
    map.on('load', function () {
      map.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': [
              [37.73498, -119.339],
              [37.73498, -119.42],
              [37.73498, -119.43],
              [37.73498, -119.45],
              [37.73498, -119.46],
              [-122.48404026031496, 37.83049717427869],
              [-122.48348236083984, 37.829920943955045],
              [-122.48356819152832, 37.82954808664175],
              [-122.48507022857666, 37.82944639795659],
              [-122.48610019683838, 37.82880236636284],
              [-122.48695850372314, 37.82931081282506],
              [-122.48700141906738, 37.83080223556934],
              [-122.48751640319824, 37.83168351665737],
              [-122.48803138732912, 37.832158048267786],
              [-122.48888969421387, 37.83297152392784],
              [-122.48987674713133, 37.83263257682617],
              [-122.49043464660643, 37.832937629287755],
              [-122.49125003814696, 37.832429207817725],
              [-122.49163627624512, 37.832564787218985],
              [-122.49223709106445, 37.83337825839438],
              [-122.49378204345702, 37.83368330777276]
            ]
          }
        }
      })
    });
    map.addLayer({
      'id': 'route',
      'type': 'line',
      'source': 'route',
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': '#888',
        'line-width': 8
      }
    });

  }

  namesel = " ";

  clickedItem(e: { id: number, name: string, image: string, description: string, ratingsAvg: number, views: number, lat: number, lon: number }) {

    this.map = new mapboxgl.Map({

      accessToken: environment.mapbox.accessToken,

      container: 'map',

      style: this.style,

      zoom: 8,

      center: [-19.5383, 37.8651]

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
