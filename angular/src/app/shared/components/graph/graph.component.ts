import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, interval, Subject, Subscription, timer } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Chart, GraphBlock } from '../../models/models';
import { DashboardService } from '../../services/dashboard.service';
import { GraphService } from '../../services/graph.service';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit, OnDestroy {

  data: GraphBlock[];
  chart: Chart;
  timer: Subscription = new Subscription();
  sub: Subscription = new Subscription();
  @Input() apiUrl: string;
  @Input() title: string;
  @Input() titleSub: string;


  constructor(private service: GraphService,
              private route: ActivatedRoute,
              private router: Router,
              private dashboard: DashboardService) {
    console.log(111)
  }

  ngOnInit() {
    console.log(123);
    this.sub.add(
      combineLatest(this.route.params, this.dashboard.getTime())
        .subscribe(([params, time]) => {
          if (params && time) {
            this.getGraph(params.id, time);
          }
        })
    );

    this.sub.add(
      this.service.get(this.apiUrl)
        .subscribe((data: GraphBlock[]) => {
          if (data) {
            this.data = data;
            if (!this.route.snapshot.params.id) {
              this.router.navigate([this.apiUrl, data[0].chartId]);
            }
          }
        })
    );
  }

  getGraph(id: number, time: number) {
    if (this.timer) {
      this.timer.unsubscribe();
      this.timer = new Subscription();
    }

    console.log(888);
    this.chart = null;
    this.timer.add(
      this.service.getChart(`${this.apiUrl}/${id}/?time=${time}`)
        .subscribe(data => this.chart = data, error => this.chart = null)
    );

    this.timer.add(
      timer(environment.polling).subscribe(
        () => {
          this.getGraph(id, time);
        }
      )
    )
  }

  ngOnDestroy() {
    console.log(777);
    this.timer.unsubscribe();
    this.sub.unsubscribe();
  }

}
