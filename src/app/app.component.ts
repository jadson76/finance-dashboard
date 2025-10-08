import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/layout/header/header.component';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    MatSidenavModule
  ],
  template: `
    <app-header></app-header>
    <mat-sidenav-container>
      <mat-sidenav mode="side" opened>
        <app-sidebar></app-sidebar>
      </mat-sidenav>
      <mat-sidenav-content>
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    mat-sidenav-container {
      flex: 1;
    }

    mat-sidenav {
      width: 250px;
    }

    .content {
      padding: 24px;
      background: #f5f5f5;
      min-height: 100%;
    }
  `]
})
export class AppComponent {
  title = 'finance-dashboard';
}
