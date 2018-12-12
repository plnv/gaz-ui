import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { News } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private readonly API_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  get(): Observable<News[]> {
    return this.http.get<News[]>(`${this.API_URL}api/news/`);
  }
}
