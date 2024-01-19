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
    this.map = L.map('map').setView([this.person.location.latitude, this.person.location.longitude], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(this.map);

    this.marker = L.marker([this.person.location.latitude, this.person.location.longitude]).addTo(this.map);
  }
}
