import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionService } from '../../../core/services/transaction.service';
import { TransactionResponse } from '../../../core/models/transaction.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message';


@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './transaction-history.html',
  styleUrl: './transaction-history.css'
})
export class TransactionHistoryComponent {

  historyForm: FormGroup;
  transactions: TransactionResponse[] = [];
  errorMessage = '';
  isLoading = false;
  searched = false;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {
    this.historyForm = this.fb.group({
      accountNumber: ['', Validators.required]
    });
  }

  loadHistory(): void {
    if (this.historyForm.invalid) {
      this.historyForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.transactions = [];
    this.searched = true;

    const accountNumber = this.historyForm.value.accountNumber;

    this.transactionService.getTransactionHistory(accountNumber).subscribe({
      next: (response) => {
        this.transactions = response.content;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message ||
          error?.error ||
          'Failed to load transaction history. Please check account number and backend service.';
        this.isLoading = false;
      }
    });
  }
}
