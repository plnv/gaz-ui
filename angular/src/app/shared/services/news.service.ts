import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { News, NewsSubject } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  selected: Subject<NewsSubject> = new Subject<NewsSubject>();

  private readonly API_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  get(): Observable<News[]> {
    return this.http.get<News[]>(`${this.API_URL}api/news/`);
  }

  set(data:NewsSubject) {
    this.selected.next(data);
  }
}
