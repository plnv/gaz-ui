import { ApplicationRef, NgModuleRef } from '@angular/core';
import { createNewHosts } from '@angularclass/hmr';
import { Promise } from '../node_modules/@types/q';
import { AppModule } from './app/app.module';

export const hmrBootstrap = (module, bootstrap) => {
  let ngModule: NgModuleRef<any>;
  module.hot.accept();
  bootstrap().then(currentModule => ngModule = currentModule);
  module.hot.dispose(() => {
    console.clear();

    const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
    const elements = appRef.components.map(c => c.location.nativeElement);
    const removeOldHosts = createNewHosts(elements);
    ngModule.destroy();
    removeOldHosts();
  });
};
