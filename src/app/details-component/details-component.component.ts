/*
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Browser, Map, map, tileLayer } from 'leaflet';

@Component({
  selector: 'app-details',
  templateUrl: './details-component.component.html',
  styleUrls: ['./details-component.component.css']
})
export class DetailsComponent {
  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement>;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    const initialState = { lng: 11, lat: 49, zoom: 4 };
    
    const lefletMap: Map = map(this.mapContainer.nativeElement).setView(
      [initialState.lat, initialState.lng],
      initialState.zoom
    );

    const isRetina = Browser.retina;
    const baseUrl =
      'https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey={apiKey}';
    const retinaUrl =
      'https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey={apiKey}';

    tileLayer(isRetina ? retinaUrl : baseUrl, {
      attribution:
        'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors',
      // This API key is for use only in stackblitz.com
      // Get your Geoapify API key on https://www.geoapify.com/get-started-with-maps-api
      // The Geoapify service is free for small projects and the development phase.
      apiKey: '18c85a44a76042788847e2fb74d27386',
      maxZoom: 20,
      id: 'osm-bright',
    } as any).addTo(lefletMap);
  }
}*/


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../Services/api-service';
import * as L from 'leaflet';

interface Person {
  _id: any;
  name: {
    last: string;
    first: string;
  };
  email: string;
  picture: string;
  location: {
    latitude: any;
    longitude: any;
  };
}

@Component({
  selector: 'app-details',
  templateUrl: './details-component.component.html',
  styleUrls: ['./details-component.component.css']
})
export class DetailsComponent implements OnInit {
  people: Person[] = [];
  
  person!: Person;
  private map!: L.Map;
  private marker!: L.Marker;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.apiService.getPeople().subscribe(people => {
      this.person =  people[Number(id)];
      this.initializeMap();
    });
    
  }

  private initializeMap(): void {
    this.map = L.map('map').setView([this.person.location.latitude, this.person.location.longitude], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(this.map);
    
    this.marker = L.marker([this.person.location.latitude, this.person.location.longitude]).addTo(this.map);
  }
  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }
}
