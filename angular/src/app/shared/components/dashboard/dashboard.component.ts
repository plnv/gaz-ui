import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { interval, Subject, Subscription } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Dashboard } from '../../models/models';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {

  private sub: Subject<void> = new Subject();

  now: number;
  time: FormControl = new FormControl();
  date: FormControl = new FormControl();
  data: Dashboard;
  interval$: Subscription;


  constructor(private service: DashboardService) {
    const time$ = this.service.time
      .pipe(takeUntil(this.sub))
      .subscribe(data => {
        this.now = data;
        this.init();
        time$.unsubscribe();
      });

    this.service.getTime();
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

  init() {
    const n = new Date(this.now);

    const t: NgbTimeStruct = { hour: n.getHours(), minute: n.getMinutes(), second: 0 };
    this.time.setValue(t);
    this.time.valueChanges
      .pipe(takeUntil(this.sub))
      .subscribe((value: NgbTimeStruct) => {
        const d = new Date(this.now);
        d.setHours(value.hour);
        d.setMinutes(value.minute);
        this.setNow(d.getTime());
      });

    const d: NgbDateStruct = { day: n.getDay(), month: n.getMonth() + 1, year: n.getFullYear() };
    this.date.setValue(d);
    this.date.valueChanges
      .pipe(takeUntil(this.sub))
      .subscribe((value: NgbDateStruct) => {
        const d = new Date(this.now);
        d.setDate(value.day);
        d.setMonth(value.month - 1);
        d.setFullYear(value.year);
        this.setNow(d.getTime());
      });
  }

  setNow(value: number) {
    this.now = value;
    this.service.setTime(value);
  }

  ngOnDestroy() {
    this.sub.next(null);
    this.sub.complete();
  }

}
