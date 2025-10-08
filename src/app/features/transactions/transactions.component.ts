import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TransactionService } from '../../core/services/transaction.service';
import { CategoryService } from '../../core/services/category.service';
import { Transaction } from '../../models/transaction';
import { Category } from '../../models/category';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  categories: Category[] = [];

  displayedColumns: string[] = ['date', 'description', 'category', 'amount', 'type', 'actions'];

  // Filtros
  searchTerm = '';
  selectedType: 'all' | 'income' | 'expense' = 'all';
  selectedCategory = 'all';

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.transactionService.transactions$.subscribe(transactions => {
      this.transactions = transactions;
      this.applyFilters();
    });

    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  applyFilters(): void {
    this.filteredTransactions = this.transactions.filter(transaction => {
      const matchesSearch = transaction.description
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());

      const matchesType = this.selectedType === 'all' || transaction.type === this.selectedType;

      const matchesCategory = this.selectedCategory === 'all' ||
        transaction.categoryId === this.selectedCategory;

      return matchesSearch && matchesType && matchesCategory;
    });
  }

  getCategoryName(categoryId: string): string {
    const category = this.categoryService.getCategoryById(categoryId);
    return category ? category.name : 'Sem categoria';
  }

  getCategoryIcon(categoryId: string): string {
    const category = this.categoryService.getCategoryById(categoryId);
    return category ? category.icon : 'help';
  }

  deleteTransaction(id: string): void {
    if (confirm('Tem certeza que deseja excluir esta transação?')) {
      this.transactionService.deleteTransaction(id);
    }
  }

  addTransaction(): void {
    // Por enquanto só um alert, depois vamos criar um dialog
    alert('Funcionalidade de adicionar transação será implementada em breve!');
  }
}
