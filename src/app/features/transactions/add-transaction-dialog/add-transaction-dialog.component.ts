import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../models/category';
import { Transaction } from '../../../models/transaction';

@Component({
  selector: 'app-add-transaction-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatIconModule
  ],
  templateUrl: './add-transaction-dialog.component.html',
  styleUrls: ['./add-transaction-dialog.component.scss']
})
export class AddTransactionDialogComponent implements OnInit {
  transactionForm: FormGroup;
  categories: Category[] = [];
  filteredCategories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddTransactionDialogComponent>,
    private categoryService: CategoryService
  ) {
    this.transactionForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(3)]],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      type: ['expense', Validators.required],
      categoryId: ['', Validators.required],
      date: [new Date(), Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.filterCategories();
    });

    // Observar mudanças no tipo para filtrar categorias
    this.transactionForm.get('type')?.valueChanges.subscribe(() => {
      this.filterCategories();
      this.transactionForm.patchValue({ categoryId: '' });
    });
  }

  filterCategories(): void {
    const type = this.transactionForm.get('type')?.value;
    this.filteredCategories = this.categories.filter(c => c.type === type);
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      const transaction: Transaction = {
        id: this.generateId(),
        ...this.transactionForm.value
      };
      this.dialogRef.close(transaction);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  // Helper para mostrar erros
  getErrorMessage(fieldName: string): string {
    const field = this.transactionForm.get(fieldName);

    if (field?.hasError('required')) {
      return 'Este campo é obrigatório';
    }

    if (field?.hasError('minlength')) {
      return 'Mínimo de 3 caracteres';
    }

    if (field?.hasError('min')) {
      return 'O valor deve ser maior que zero';
    }

    return '';
  }
}
