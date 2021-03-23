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

  selectedSubTrialFromDetailsComponent: any;


  map?: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat: number = 51.678418;
  lng: number = 7.809007;


  constructor(private detailService: DetailServiceClass) {
    this.selectedSubTrialFromDetailsComponent = this.detailService.selectedSubTrail;

  }

  ngOnInit(): void {
    this.selectedSubTrialFromDetailsComponent = this.detailService.selectedSubTrail;
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      zoom: 8,
      center: [-119.5383, 51.678418]

    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

    var marker = new mapboxgl.Marker()
      .setLngLat([-119.5383, 51.678418])
      .addTo(this.map);
  }


}
