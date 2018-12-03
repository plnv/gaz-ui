import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { hmrBootstrap } from './main.hmr';

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

// @ts-ignore
if (module['hot']) {
  // @ts-ignore
  hmrBootstrap(module, bootstrap);
} else {
  bootstrap();
}

