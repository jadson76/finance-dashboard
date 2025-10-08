import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TransactionService } from '../../core/services/transaction.service';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  transactions: Transaction[] = [];
  totalIncome = 0;
  totalExpense = 0;
  balance = 0;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionService.transactions$.subscribe(transactions => {
      this.transactions = transactions;
      this.calculateTotals();
    });
  }

  private calculateTotals(): void {
    this.totalIncome = this.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    this.totalExpense = this.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    this.balance = this.totalIncome - this.totalExpense;
  }
}
