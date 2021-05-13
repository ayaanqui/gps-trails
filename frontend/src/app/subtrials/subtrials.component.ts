import { Component, OnInit } from '@angular/core';
import { DetailServiceClass } from '../home/details.service';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-subtrials',
  templateUrl: './subtrials.component.html',
  styleUrls: ['./subtrials.component.css']
})
export class SubtrialsComponent implements OnInit {

  selectedSubTrialFromDetailsComponent: {
    name: string, reviewsTrial: number, noOfReview: number, length: number, latitude: number, longitude: number,
    time: number, image: string, images: any, path: any, difficulty: string, description: string, routetype: string, elevationgain: number,
    reviews: any
  } = {
      name: "", reviewsTrial: 234, noOfReview: 23, length: 34, latitude: 45, longitude: 567,
      time: 35, image: "", images: [], path: [], difficulty: "", description: "", routetype: "34", elevationgain: 34,
      reviews: 3
    };


  map?: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';

  path: number[][] = [[], []];

  constructor(private detailService: DetailServiceClass) {
    this.selectedSubTrialFromDetailsComponent = this.detailService.selectedSubTrail;
    this.path = this.selectedSubTrialFromDetailsComponent.path;

  }


  ngOnInit(): void {
    var map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.selectedSubTrialFromDetailsComponent.longitude, this.selectedSubTrialFromDetailsComponent.latitude]
    });
    // Add map controls
    map.addControl(new mapboxgl.NavigationControl());

    var popup = new mapboxgl.Popup()
      .setText(this.selectedSubTrialFromDetailsComponent.name)
      .addTo(map);

    var marker = new mapboxgl.Marker()
      .setLngLat([this.selectedSubTrialFromDetailsComponent.longitude, this.selectedSubTrialFromDetailsComponent.latitude]).setPopup(popup)
      .addTo(map);

    var pathCoordinates = this.selectedSubTrialFromDetailsComponent.path;
    map.on('load', function () {
      map.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [
            {
              'type': 'Feature',
              'properties': {
                'color': '#F7455D' // red
              },
              'geometry': {
                'type': 'LineString',
                'coordinates': pathCoordinates
              }
            },
            {
              'type': 'Feature',
              'properties': {
                'color': '#33C9EB' // blue
              },
              'geometry': {
                'type': 'LineString',
                'coordinates': []
              }
            }
          ]
        }
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
          'line-color': '#F7455D',
          'line-width': 7
        }
      });
    });
  }

}
