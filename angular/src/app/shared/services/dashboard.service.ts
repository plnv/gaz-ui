import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Dashboard } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  time: ReplaySubject<number> = new ReplaySubject<number>();

  private readonly API_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  get(): Observable<Dashboard> {
    return this.http.get<Dashboard>(`${this.API_URL}api/dashboard/`);
  }

  getTime() {
    this.http.get<number>(`${this.API_URL}api/now/`).subscribe((data: any) => this.setTime(data.time));
  }

  setTime(value: number) {
    this.time.next(value);
  }


}
