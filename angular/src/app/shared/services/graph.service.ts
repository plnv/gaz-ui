import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Chart, GraphBlock } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private readonly API_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  get(value: string): Observable<GraphBlock[]> {
    return this.http.get<GraphBlock[]>(`${this.API_URL}api/${value}/`);
  }

  getChart(value: string): Observable<Chart> {
    return this.http.get<Chart>(`${this.API_URL}api/chart/${value}`);
  }
}
