import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = [
    { id: 'salary', name: 'Salário', icon: 'payments', color: '#4CAF50', type: 'income' },
    { id: 'freelance', name: 'Freelance', icon: 'work', color: '#8BC34A', type: 'income' },
    { id: 'housing', name: 'Moradia', icon: 'home', color: '#F44336', type: 'expense' },
    { id: 'food', name: 'Alimentação', icon: 'restaurant', color: '#FF9800', type: 'expense' },
    { id: 'transport', name: 'Transporte', icon: 'directions_car', color: '#2196F3', type: 'expense' },
    { id: 'entertainment', name: 'Lazer', icon: 'movie', color: '#9C27B0', type: 'expense' }
  ];

  getCategories(): Observable<Category[]> {
    return of(this.categories);
  }

  getCategoryById(id: string): Category | undefined {
    return this.categories.find(c => c.id === id);
  }
}
