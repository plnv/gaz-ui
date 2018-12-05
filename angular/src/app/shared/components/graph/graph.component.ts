import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GraphService } from '../../services/graph.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  providers: [GraphService]
})
export class GraphComponent implements OnInit {

  data: any[];
  dataGraph: any;

  @Input() apiUrl: string;
  @Input() title: string;
  @Input() titleSub: string;

  constructor(private service: GraphService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.getGraph(params.id);
      }
    });
  }

  ngOnInit() {
    this.service.get(this.apiUrl).subscribe(data => this.data = data);
  }

  getGraph(id: number) {
    this.dataGraph = null;
    this.service.getGraph(id).subscribe(data => this.dataGraph = data);
  }

}
