import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subscription, timer } from 'rxjs';
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
              private dashboard: DashboardService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.sub.add(
      combineLatest(this.route.params, this.dashboard.getTime())
        .subscribe(([params, time]) => {
          if (params && time) {
            const { id } = params;
            if (id) {
              this.getGraph(id, time);
            }
            this.getData(id, time);
          }
        })
    );
  }


  getData(id: number, time: number) {
    if (!this.data) {
      this.sub.add(
        this.service.get(`${this.apiUrl}?time=${time}`)
          .subscribe((data: GraphBlock[]) => {
            this.data = data;
            if (!id) {
              this.router.navigate([this.apiUrl, data[0].chartId]);
            }
          })
      );
    }
  }

  getGraph(id: number, time: number) {
    if (this.timer) {
      this.timer.unsubscribe();
      this.timer = new Subscription();
    }

    this.chart = null;
    this.timer.add(
      this.service.getChart(`${this.apiUrl}/${id}?time=${time}`)
        .subscribe(data => this.chart = data, error => this.chart = null)
    );

    this.timer.add(
      timer(environment.polling)
        .subscribe(() => {
          this.getGraph(id, time);
        })
    );
  }

  ngOnDestroy() {
    this.timer.unsubscribe();
    this.sub.unsubscribe();
  }

}
