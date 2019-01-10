import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import { AppComponent } from './app.component';
import { CertificationComponent } from './certification/certification.component';
import { EnergyComponent } from './energy/energy.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardService } from './shared/services/dashboard.service';
import { NewsService } from './shared/services/news.service';
import { SharedModule } from './shared/shared.module';


registerLocaleData(localeRu);


const routes: Routes = [
  { path: '', redirectTo: 'certification/', pathMatch: 'full' },

  { path: 'certification', redirectTo: 'certification/', pathMatch: 'full' },
  { path: 'certification/:id', component: CertificationComponent },

  { path: 'energy', redirectTo: 'energy/', pathMatch: 'full' },
  { path: 'energy/:id', component: EnergyComponent },

  { path: '**', component: NotFoundComponent },
];


@NgModule({
  declarations: [
    CertificationComponent,
    EnergyComponent,
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    DashboardService,
    NewsService,
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
