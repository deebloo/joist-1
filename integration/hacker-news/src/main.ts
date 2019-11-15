import './app/app.component';

import { bootstrapApplication, Renderer } from '@lit-kit/component';
import { ShadyRenderer } from '@lit-kit/component/out/lib/shady-renderer';

bootstrapApplication([{ provide: Renderer, useClass: ShadyRenderer }]); // only needed if you want singleton providers

if (process.env.NODE_ENV === 'production') {
  navigator.serviceWorker.register('/service-worker.js').then(
    function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    },
    function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    }
  );
}
