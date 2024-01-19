import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Person {
  _id: string;
  name: {
    last: string;
    first: string;
  };
  email: string;
  picture: string;
  location: {
    latitude: number;
    longitude: number | null;
  };
}

@Injectable({
  providedIn: 'root'
})



export class ApiService {

  private apiUrl = 'https://api.json-generator.com/templates/-xdNcNKYtTFG/data'; // Replace with your API endpoint
  private authToken = 'b2atclr0nk1po45amg305meheqf4xrjt9a1bo410'; // Replace with your authentication token


  constructor(private http: HttpClient) {}

  getPeople(): Observable<Person[]> {
    const headers = this.createAuthHeaders();
    return this.http.get<Person[]>(this.apiUrl,{ headers });
  }

  getPersonById(id: string): Observable<Person> {
    return this.http.get<Person>(`${this.apiUrl}/${id}`);
  }

  private createAuthHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);
  }
}