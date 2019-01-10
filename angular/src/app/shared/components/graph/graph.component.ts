import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, interval, Subject, Subscription } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Chart, GraphBlock } from '../../models/models';
import { DashboardService } from '../../services/dashboard.service';
import { GraphService } from '../../services/graph.service';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  providers: [GraphService]
})
export class GraphComponent implements OnInit, OnDestroy {

  data: GraphBlock[];
  chart: Chart;
  interval$: Subscription;
  combine$: Subscription;
  @Input() apiUrl: string;
  @Input() title: string;
  @Input() titleSub: string;
  private sub: Subject<void> = new Subject();

  constructor(private service: GraphService,
              private route: ActivatedRoute,
              private router: Router,
              private dashboard: DashboardService) {
  }

  ngOnInit() {
    this.combine$ = combineLatest(this.route.params, this.dashboard.time)
      .pipe(takeUntil(this.sub))
      .subscribe(([params, time]) => {
        if (params && time) {
          this.getGraph(params.id, time);
        }
      });

    this.service.get(this.apiUrl)
      .pipe(takeUntil(this.sub))
      .subscribe((data: GraphBlock[]) => {
        if (data) {
          this.data = data;
          if (!this.route.snapshot.params.id) {
            this.router.navigate([this.apiUrl, data[0].chartId]);
          }
        }
      });
  }

  getGraph(id: number, time: number) {
    if (this.interval$) {
      this.interval$.unsubscribe();
    }

    this.chart = null;
    this.interval$ = interval(environment.polling)
      .pipe(
        takeUntil(this.sub),
        startWith(0),
        switchMap(() => this.service.getChart(`${this.apiUrl}/${id}/?time=${time}`))
      )
      .subscribe(data => this.chart = data, error => this.chart = null);
  }

  ngOnDestroy() {
    this.sub.next(null);
    this.sub.complete();
  }

}
