import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Transaction } from '../../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactions: Transaction[] = [
    {
      id: '1',
      description: 'Salário',
      amount: 5000,
      type: 'income',
      categoryId: 'salary',
      date: new Date('2024-10-01')
    },
    {
      id: '2',
      description: 'Aluguel',
      amount: 1500,
      type: 'expense',
      categoryId: 'housing',
      date: new Date('2024-10-05')
    },
    {
      id: '3',
      description: 'Supermercado',
      amount: 450,
      type: 'expense',
      categoryId: 'food',
      date: new Date('2024-10-08')
    }
  ];

  private transactionsSubject = new BehaviorSubject<Transaction[]>(this.transactions);
  public transactions$ = this.transactionsSubject.asObservable();

  getTransactions(): Observable<Transaction[]> {
    return this.transactions$;
  }

  addTransaction(transaction: Transaction): void {
    this.transactions.push(transaction);
    this.transactionsSubject.next(this.transactions);
  }

  deleteTransaction(id: string): void {
    this.transactions = this.transactions.filter(t => t.id !== id);
    this.transactionsSubject.next(this.transactions);
  }
}
