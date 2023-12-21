import {AsyncPipe, NgIf} from "@angular/common";
import {Component, inject} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {ActivatedRoute, Router, RouterModule, TitleStrategy} from '@angular/router';
import {AuthService} from "@auth0/auth0-angular";
import {map, tap} from "rxjs";

@Component({
  selector: 'ps-main-layout',
  standalone: true,
  imports: [NgIf,RouterModule, MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule, MatButtonModule, AsyncPipe],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  private readonly authService = inject(AuthService);
  open = false;

  user$ = this.authService.user$.pipe(tap(user => (console.log(user))));
  authenticated$ = this.authService.isAuthenticated$;

  login(): void {
    this.authService.loginWithRedirect();
  }

  logout(): void {
    this.authService.logout();
  }

  toggleMenu() {
    this.open = !this.open;
  }
}
