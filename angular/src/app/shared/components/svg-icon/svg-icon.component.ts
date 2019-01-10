import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgIconComponent {

  @Input() color: string;

  @Input() set url(value: string) {
    if (value) {
      this.http.get(value, { responseType: 'text' }).subscribe((data) => {
        this.html = data;
        if (this.color) {
          let reg = new RegExp('fill:[^;]*;', 'gi');
          this.html = this.html.replace(reg, 'fill: ' + this.color + ';');
          reg = new RegExp('fill="[^"]*"', 'gi');
          this.html = this.html.replace(reg, 'fill="' + this.color + '"');
        }
        this.element.nativeElement.innerHTML = this.html;
      });
    }
  }

  html = '';

  constructor(private http: HttpClient, private element: ElementRef) {
  }

}
