import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss']
})
export class SvgIconComponent implements OnInit {

  @Input() url = '';
  @Input() color: string;

  html = '';

  constructor(private http: HttpClient, private element: ElementRef) {
  }

  ngOnInit() {
    // if (this.url) {
    //   this.http.get(this.url).subscribe((data) => {
    //     console.log(data);
    //     // this.html = res;
    //     // if (this.color) {
    //     //   let reg = new RegExp('fill:[^;]*;', 'gi');
    //     //   this.html = this.html.replace(reg, 'fill: ' + this.color + ';');
    //     //   reg = new RegExp('fill="[^"]*"', 'gi');
    //     //   this.html = this.html.replace(reg, 'fill="' + this.color + '"');
    //     // }
    //     // this.element.nativeElement.innerHTML = this.html;
    //   });
    // }
  }
}
