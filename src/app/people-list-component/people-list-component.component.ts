import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ApiService} from '../Services/api-service';
import { DetailsComponent } from '../details-component/details-component.component';

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
  selector: 'app-people-list',
  templateUrl: './people-list-component.component.html',
  styleUrls: ['./people-list-component.component.css']
})
export class PeopleListComponent implements OnInit {
@ViewChild(DetailsComponent) detailsComponent: DetailsComponent;

  people: Person[] = [];

  constructor(private apiService: ApiService,  private router: Router) { }

  ngOnInit() {
    this.apiService.getPeople().subscribe(people => {
      this.people = people;
    });
  }

  navigateToDetails(index : number): void {
    this.detailsComponent.updateMarker(index);

  }
  
  
}