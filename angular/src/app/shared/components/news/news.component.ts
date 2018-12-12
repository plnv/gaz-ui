import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from '../../models/models';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  providers: [NewsService]
})
export class NewsComponent implements OnInit {

  news$: Observable<News[]>;
  selected: number;

  constructor(private service: NewsService) {
  }

  ngOnInit() {
    this.news$ = this.service.get();
  }

  onSelect(id: any) {
    this.selected = id;
  }
}
