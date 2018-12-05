import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

  data: any;

  constructor(private service: DashboardService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    // this.router.events.subscribe(data => {
    //   console.log(data);
    // })
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        console.log(this.route.snapshot.paramMap);
      }
    });
    this.service.get().subscribe(data => this.data = data);
  }

}
