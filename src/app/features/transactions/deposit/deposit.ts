import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionService } from '../../../core/services/transaction.service';
import { DepositRequest, TransactionResponse } from '../../../core/models/transaction.model';

@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './deposit.html',
  styleUrl: './deposit.css'
})
export class DepositComponent {

  depositForm: FormGroup;
  transaction?: TransactionResponse;
  successMessage = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {
    this.depositForm = this.fb.group({
      accountNumber: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]]
    });
  }

  depositAmount(): void {
    if (this.depositForm.invalid) {
      this.depositForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.transaction = undefined;

    const request: DepositRequest = this.depositForm.value;

    this.transactionService.deposit(request).subscribe({
      next: (response) => {
        this.transaction = response;
        this.successMessage = 'Deposit completed successfully';
        this.depositForm.reset({
          accountNumber: '',
          amount: 0
        });
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Deposit failed. Please check account number and backend service.';
        this.isLoading = false;
      }
    });
  }
}
