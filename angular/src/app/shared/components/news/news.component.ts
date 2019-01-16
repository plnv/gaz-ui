import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
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
  critical: number;
  important: number;

  sub: Subscription = new Subscription();
  initSub: Subscription = new Subscription();

  constructor(private news: NewsService, private dashboard: DashboardService) {
  }

  ngOnInit() {
    this.initSub.add(
      this.dashboard.getTime()
        .subscribe(data => {
          this.now = data;
          this.init();
        })
    );

    this.initSub.add(
      this.news.getSelected().subscribe(
        data => {
          this.selected = data.id;
        }
      )
    )
  }

  init() {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = new Subscription();
    }

    this.sub.add(
      this.news.get(this.now)
        .subscribe(data => {

            this.data = data;
            this.critical = data.filter(i => i.level === 'critical').length;
            this.important = data.filter(i => i.level === 'important').length;

            if (this.selected === undefined) {
              const { id, facility } = data[0];
              this.onSelect(id, facility);
            }
          }
        )
    );

    this.sub.add(
      timer(environment.polling)
        .subscribe(() => {
          this.init();
        })
    )
  }

  onSelect(id: number, facility: string) {
    this.news.set({ id, facility })
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
    this.sub.unsubscribe();
    this.initSub.unsubscribe();
  }

}
