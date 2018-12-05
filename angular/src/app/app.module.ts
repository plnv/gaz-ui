import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CertificationComponent } from './certification/certification.component';
import { EnergyComponent } from './energy/energy.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from './shared/shared.module';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
