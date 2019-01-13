import { Component, OnInit } from '@angular/core';
import { interval, Subject, Subscription } from 'rxjs';
import { startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { News } from '../../models/models';
import { DashboardService } from '../../services/dashboard.service';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {

  now: number;
  data: News[];
  selected: number;
  interval$: Subscription;
  critical: number;
  important: number;

  private sub: Subject<void> = new Subject();

  constructor(private service: NewsService, private dashboard: DashboardService) {
  }

  ngOnInit() {
    this.dashboard.time
      .pipe(takeUntil(this.sub))
      .subscribe(data => {
        this.now = data;
        this.init();
      });

    this.service.selected
      .pipe(
        takeUntil(this.sub),
      ).subscribe(data => this.selected = data.id)
  }

  init() {
    if (this.interval$) {
      this.interval$.unsubscribe();
    }

    this.interval$ = interval(environment.polling)
      .pipe(
        takeUntil(this.sub),
        startWith(0),
        switchMap(() => this.service.get(this.now)),
        tap(data => {

          this.critical = data.filter(i => i.level === 'critical').length;
          this.important = data.filter(i => i.level === 'important').length;

          if (this.selected === undefined) {
            const { id, facility } = data[0];
            this.onSelect(id, facility);
          }
        })
      )
      .subscribe(data => this.data = data, error => this.data = null);
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
