import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HighchartsChartModule } from 'highcharts-angular';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GraphComponent } from './components/graph/graph.component';
import { HighchartComponent } from './components/graph/highchart/highchart.component';
import { SchemeComponent } from './components/scheme/scheme.component';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { HeaderComponent } from './components/header/header.component';
import { NewsComponent } from './components/news/news.component';
import { ToNumberPipe } from './pipes/tonumber.pipe';


const MODULES = [
  FormsModule,
  ReactiveFormsModule,
  BrowserModule,
  CommonModule,
  HttpClientModule,
  RouterModule,
  HighchartsChartModule,
  NgbModule
];


const COMPONENTS = [
  SvgIconComponent,
  DashboardComponent,
  GraphComponent,
  HighchartComponent,
  SchemeComponent,
  HeaderComponent,
  NewsComponent
];


const PIPES = [
  ToNumberPipe
];


@NgModule({
  declarations: [
    ...PIPES,
    ...COMPONENTS,
  ],
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS
  ]
})
export class SharedModule {
}
