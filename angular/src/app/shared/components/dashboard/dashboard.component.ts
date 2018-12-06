import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subject, Subscription } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import { Dashboard, POLLING } from '../../models/models';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit, OnDestroy {

  data: Dashboard;

  interval$: Subscription;

  private sub: Subject<void> = new Subject();

  constructor(private service: DashboardService) {
  }

  ngOnInit() {
    if (this.interval$) {
      this.interval$.unsubscribe();
    }

    this.interval$ = interval(POLLING)
      .pipe(
        takeUntil(this.sub),
        startWith(0),
        switchMap(() => this.service.get())
      )
      .subscribe(data => this.data = data, error => this.data = null);
    // this.service.get().subscribe((data: Dashboard) => this.data = data);
  }

  ngOnDestroy() {
    this.sub.next();
    this.sub.complete();
  }

}
