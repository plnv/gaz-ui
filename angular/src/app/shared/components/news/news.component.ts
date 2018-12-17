import { Component, OnInit } from '@angular/core';
import { interval, Observable, Subject, Subscription } from 'rxjs';
import { startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { News, NewsSubject } from '../../models/models';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
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
        switchMap(() => this.service.get()),
        tap( data => {
          if (this.selected === undefined) {
            const {id, facility} = data[0];
            this.onSelect(id, facility);
          }
        })
      )
      .subscribe(data => this.data = data, error => this.data = null);

    this.service.selected
      .pipe(
        takeUntil(this.sub),
      ).subscribe(data => this.selected = data.id)
  }

  onSelect(id: number, facility: string) {
    this.service.set({ id, facility });
  }

  getStatus(value: string): string {
    if (value === 'critical') {
      return 'red';
    }
    if (value === 'important') {
      return 'yellow';
    }
  }

  ngOnDestroy() {
    this.sub.next(null);
    this.sub.complete();
  }

}
