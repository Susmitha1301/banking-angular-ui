import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionService } from '../../../core/services/transaction.service';
import { TransactionResponse, TransferRequest } from '../../../core/models/transaction.model';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transfer.html',
  styleUrl: './transfer.css'
})
export class TransferComponent {

  transferForm: FormGroup;
  transaction?: TransactionResponse;
  successMessage = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {
    this.transferForm = this.fb.group({
      fromAccountNumber: ['', Validators.required],
      toAccountNumber: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]]
    });
  }

  transferAmount(): void {
    if (this.transferForm.invalid) {
      this.transferForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.transaction = undefined;

    const request: TransferRequest = this.transferForm.value;

    this.transactionService.transfer(request).subscribe({
      next: (response) => {
        this.transaction = response;
        this.successMessage = 'Transfer completed successfully';
        this.transferForm.reset({
          fromAccountNumber: '',
          toAccountNumber: '',
          amount: 0
        });
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Transfer failed. Please check accounts, balance, and backend service.';
        this.isLoading = false;
      }
    });
  }
}
