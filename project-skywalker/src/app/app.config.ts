import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {authHttpInterceptorFn, provideAuth0} from "@auth0/auth0-angular";

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withFetch(), withInterceptors([authHttpInterceptorFn])),
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
        allowedList: ['https://tt-pj-sample-api.azurewebsites.net/*'],
      },
    })
  ]
};
