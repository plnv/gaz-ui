import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

  data: any;

  constructor(private service: DashboardService) {
  }

  ngOnInit() {
    this.service.get().subscribe(data => this.data = data);
  }

}
