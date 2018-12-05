import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GraphComponent } from './components/graph/graph.component';
import { HighchartComponent } from './components/graph/highchart/highchart.component';
import { SchemeComponent } from './components/scheme/scheme.component';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { HeaderComponent } from './components/header/header.component';


const MODULES = [
  BrowserModule,
  CommonModule,
  HttpClientModule,
  RouterModule,
  HighchartsChartModule
];


const COMPONENTS = [
  SvgIconComponent,
  DashboardComponent,
  GraphComponent,
  HighchartComponent,
  SchemeComponent,
  HeaderComponent
];


@NgModule({
  declarations: [
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
