import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { interval, Subject, Subscription } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Chart, GraphBlock } from '../../models/models';
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

  private sub: Subject<void> = new Subject();

  @Input() apiUrl: string;
  @Input() title: string;
  @Input() titleSub: string;

  constructor(private service: GraphService, private route: ActivatedRoute, private router: Router) {
    this.route.params
      .pipe(takeUntil(this.sub))
      .subscribe((params: Params) => {
        if (params.id) {
          this.getGraph(params.id);
        }
      });
  }

  ngOnInit() {
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

  getGraph(id: number) {
    if (this.interval$) {
      this.interval$.unsubscribe();
    }

    this.chart = null;
    this.interval$ = interval(environment.polling)
      .pipe(
        takeUntil(this.sub),
        startWith(0),
        switchMap(() => this.service.getChart(id))
      )
      .subscribe(data => this.chart = data, error => this.chart = null);
  }

  ngOnDestroy() {
    this.sub.next(null);
    this.sub.complete();
  }

}
