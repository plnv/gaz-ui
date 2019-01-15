import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
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
    this.dashboard.getTime()
      .subscribe(data => {
        this.now = data;
        this.init();
      })
  }

  init() {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = new Subscription();
    }

    this.sub.add(
      this.dashboard.get(this.now)
        .subscribe(data => this.data = data, error => this.data = null)
    );

    const n = new Date(this.now);

    const t: NgbTimeStruct = { hour: n.getHours(), minute: n.getMinutes(), second: 0 };
    this.time.setValue(t);

    const d: NgbDateStruct = { day: n.getDay(), month: n.getMonth() + 1, year: n.getFullYear() };
    this.date.setValue(d);

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

  setNow(value: number) {
    this.dashboard.setTime(value);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
