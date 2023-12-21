import {inject} from "@angular/core";
import { CanActivateFn } from '@angular/router';
import {AuthService} from "@auth0/auth0-angular";
import {map} from "rxjs";

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.isAuthenticated$.pipe(
    map(authenticated =>  {
      if (!authenticated) {
        authService.loginWithRedirect({fragment: window.location.origin + state.url, openUrl: (url) => window.location.replace(url)});
      }
      return authenticated;
    })
  );
};
