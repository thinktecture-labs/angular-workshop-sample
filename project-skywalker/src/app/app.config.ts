import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {AuthHttpInterceptor, provideAuth0} from "@auth0/auth0-angular";

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withFetch()),
    provideAuth0({
      domain: 'dev-hrr8z10c.us.auth0.com',
      clientId: 'rYZD3bwpjaGILf09iInGBhOBvgvXAReo',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'poke-app-backend',
        scope: 'openid profile read:pokemon',
      },

      // Specify configuration for the interceptor
      httpInterceptor: {
        allowedList: ['https://localhost:7184/*', 'https://tt-pj-sample-api.azurewebsites.net/*'],
      },
    }),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    }
  ]
};
