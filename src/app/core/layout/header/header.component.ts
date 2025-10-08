import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <mat-icon>account_balance_wallet</mat-icon>
      <span class="title">Finance Dashboard</span>
      <span class="spacer"></span>
      <button mat-icon-button>
        <mat-icon>notifications</mat-icon>
      </button>
      <button mat-icon-button>
        <mat-icon>account_circle</mat-icon>
      </button>
    </mat-toolbar>
  `,
  styles: [`
    .title {
      margin-left: 16px;
      font-size: 20px;
      font-weight: 500;
    }
    .spacer {
      flex: 1 1 auto;
    }
  `]
})
export class HeaderComponent {}
