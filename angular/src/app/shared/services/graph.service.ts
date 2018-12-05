import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private readonly API_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  get(value: string): Observable<any> {
    return this.http.get(`${this.API_URL}api/${value}/`);
  }

  getGraph(value: number): Observable<any> {
    return this.http.get(`${this.API_URL}api/graph/${value}`);
  }
}
