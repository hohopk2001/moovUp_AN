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
  index: any;
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    
    this.index = this.route.snapshot.paramMap.get('index');
    this.apiService.getPeople().subscribe(people => {
      this.people =  people
      this.initializeMap();
    });
    
  }

  private initializeMap(): void {
    this.map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(this.map);
    
    
  }
  
  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }

  updateMarker(index1: any){
  
    const person =  this.people[index1];

    var customIcon = L.icon({
      iconUrl: person.picture,
      iconSize: [50, 50], // Adjust the size as per your image dimensions
      iconAnchor: [16, 32], // Adjust the anchor point to align the image with the marker's position
      popupAnchor: [0, -32] // Adjust the popup anchor if you want to display a popup message
    });
    


    this.marker = L.marker([person.location.latitude, person.location.longitude],{ icon: customIcon }).addTo(this.map);
    this.marker.bindPopup("Hello, I'm  "+person.name.last+" " + person.name.first);
    
  }
}
