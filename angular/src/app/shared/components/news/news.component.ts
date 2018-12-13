import { Component, OnInit } from '@angular/core';
import { interval, Subject, Subscription } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { News } from '../../models/models';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  providers: [NewsService]
})
export class NewsComponent implements OnInit {

  data: News[];
  selected: number;
  interval$: Subscription;
  private sub: Subject<void> = new Subject();

  constructor(private service: NewsService) {
  }

  ngOnInit() {
    this.interval$ = interval(environment.polling)
      .pipe(
        takeUntil(this.sub),
        startWith(0),
        switchMap(() => this.service.get())
      )
      .subscribe(data => this.data = data, error => this.data = null);
  }

  onSelect(id: any) {
    this.selected = id;
  }

  ngOnDestroy() {
    this.sub.next();
    this.sub.complete();
  }

}
