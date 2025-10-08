import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatListModule, MatIconModule],
  template: `
    <mat-nav-list>
      <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
        <mat-icon matListItemIcon>dashboard</mat-icon>
        <span matListItemTitle>Dashboard</span>
      </a>
      <a mat-list-item routerLink="/transactions" routerLinkActive="active">
        <mat-icon matListItemIcon>receipt_long</mat-icon>
        <span matListItemTitle>Transações</span>
      </a>
      <a mat-list-item>
        <mat-icon matListItemIcon>bar_chart</mat-icon>
        <span matListItemTitle>Relatórios</span>
      </a>
      <a mat-list-item>
        <mat-icon matListItemIcon>settings</mat-icon>
        <span matListItemTitle>Configurações</span>
      </a>
    </mat-nav-list>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
      background: #fafafa;
    }

    mat-nav-list {
      padding-top: 0;
    }

    a {
      margin: 4px 8px;
      border-radius: 8px;

      &.active {
        background-color: #e3f2fd;
        color: #1976d2;

        mat-icon {
          color: #1976d2;
        }
      }
    }
  `]
})
export class SidebarComponent {}
