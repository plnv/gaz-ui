import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { GraphComponent } from './components/graph/graph.component';


@NgModule({
  declarations: [
    DashboardComponent,
    NotFoundComponent,
    GraphComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
    DashboardComponent,
    GraphComponent
  ]
})
export class CoreModule {
}
