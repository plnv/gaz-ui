import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Dashboard } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly API_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  get(): Observable<Dashboard> {
    return this.http.get<Dashboard>(`${this.API_URL}api/dashboard/`);
  }
}
