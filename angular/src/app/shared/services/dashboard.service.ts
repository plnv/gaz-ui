import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Time } from '../class/time.class';
import { Dashboard } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public time: BehaviorSubject<number> = new BehaviorSubject(Date.now());

  private readonly API_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  get(value: number): Observable<Dashboard> {
    return this.http.get<Dashboard>(`${this.API_URL}api/dashboard${Time.toParam(value)}`);
  }

  getTime(): Observable<number> {
    return this.time.asObservable();
  }

  setTime(value: number) {
    this.time.next(value);
  }
}
