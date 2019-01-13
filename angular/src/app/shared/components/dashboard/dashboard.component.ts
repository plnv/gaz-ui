import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Dashboard } from '../../models/models';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {

  now: number;
  time: FormControl = new FormControl();
  date: FormControl = new FormControl();
  data: Dashboard;
  sub: Subscription = new Subscription();


  constructor(private dashboard: DashboardService) {
  }

  ngOnInit() {
    this.sub.add(
      this.dashboard.getTime()
        .pipe(take(1))
        .subscribe(data => {
          this.now = data;
          this.init();
        })
    );

    this.sub.add(
      this.dashboard.get()
        .subscribe(data => this.data = data, error => this.data = null)
    );

    this.sub.add(
      this.time.valueChanges
        .subscribe((value: NgbTimeStruct) => {
          const d = new Date(this.now);
          d.setHours(value.hour);
          d.setMinutes(value.minute);
          this.setNow(d.getTime());
        })
    );

    this.sub.add(
      this.date.valueChanges
        .subscribe((value: NgbDateStruct) => {
          const d = new Date(this.now);
          d.setDate(value.day);
          d.setMonth(value.month - 1);
          d.setFullYear(value.year);
          this.setNow(d.getTime());
        })
    );
  }

  init() {
    const n = new Date(this.now);

    const t: NgbTimeStruct = { hour: n.getHours(), minute: n.getMinutes(), second: 0 };
    this.time.setValue(t);

    const d: NgbDateStruct = { day: n.getDay(), month: n.getMonth() + 1, year: n.getFullYear() };
    this.date.setValue(d);
  }

  setNow(value: number) {
    this.now = value;
    this.dashboard.setTime(value);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
