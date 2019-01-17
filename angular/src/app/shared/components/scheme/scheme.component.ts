import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-scheme',
  templateUrl: './scheme.component.html',
  styleUrls: ['./scheme.component.scss'],
})
export class SchemeComponent implements OnInit {

  url$: Observable<string>;

  constructor(private news: NewsService) {
  }

  ngOnInit() {
    this.url$ = this.news.getSelected()
      .pipe(
        map(data => {
          return data.facility
        })
      );
  }

}
