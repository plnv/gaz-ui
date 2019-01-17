import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Time } from '../../class/time.class';
import { Chart, GraphBlock } from '../../models/models';
import { DashboardService } from '../../services/dashboard.service';
import { GraphService } from '../../services/graph.service';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit, OnDestroy {

  id: number;
  now: number;
  data: GraphBlock[];
  chart: Chart;

  sub: Subscription = new Subscription();
  initSub: Subscription = new Subscription();
  graphSub: Subscription = new Subscription();

  @Input() apiUrl: string;
  @Input() title: string;
  @Input() titleSub: string;


  constructor(private service: GraphService,
              private dashboard: DashboardService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.initSub.add(
      this.dashboard.getTime()
        .subscribe(data => {
            this.now = data;
            this.init();
            this.initData();
          }
        )
    );

    this.initSub.add(
      this.route.params
        .subscribe(data => {
          if (data.id) {
            this.id = data.id;
            this.init();
          }
        })
    )
  }


  initData() {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = new Subscription();
    }

    this.sub.add(
      this.service.get(`${this.apiUrl}${Time.toParam(this.now)}`)
        .subscribe((data: GraphBlock[]) => {
          this.data = data;
          if (!this.id) {
            this.router.navigate([this.apiUrl, data[0].chartId]);
          }
        })
    );
  }


  init() {
    if (!this.id) {
      return;
    }
    if (this.graphSub) {
      this.graphSub.unsubscribe();
      this.graphSub = new Subscription();
    }

    this.chart = null;
    this.graphSub.add(
      this.service.getChart(`${this.apiUrl}/${this.id}${Time.toParam(this.now)}`)
        .subscribe(data => this.chart = data, error => this.chart = null)
    );

    this.graphSub.add(
      timer(environment.polling)
        .subscribe(() => {
          this.init();
        })
    );
  }

  ngOnDestroy() {
    this.graphSub.unsubscribe();
    this.sub.unsubscribe();
    this.initSub.unsubscribe();
  }

}
