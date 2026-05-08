import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionService } from '../../../core/services/transaction.service';
import { TransactionResponse, WithdrawRequest } from '../../../core/models/transaction.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message';
import { SuccessMessageComponent } from '../../../shared/components/success-message/success-message';


@Component({
  selector: 'app-withdraw',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingSpinnerComponent, ErrorMessageComponent, SuccessMessageComponent],
  templateUrl: './withdraw.html',
  styleUrl: './withdraw.css'
})
export class WithdrawComponent {

  withdrawForm: FormGroup;
  transaction?: TransactionResponse;
  successMessage = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {
    this.withdrawForm = this.fb.group({
      accountNumber: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]]
    });
  }

  withdrawAmount(): void {
    if (this.withdrawForm.invalid) {
      this.withdrawForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.transaction = undefined;

    const request: WithdrawRequest = this.withdrawForm.value;

    this.transactionService.withdraw(request).subscribe({
      next: (response) => {
        this.transaction = response;
        this.successMessage = 'Withdrawal completed successfully';
        this.withdrawForm.reset({
          accountNumber: '',
          amount: 0
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message ||
          error?.error ||
          'Withdrawal failed. Please check account number, balance, and backend service.';
        this.isLoading = false;
      }
    });
  }
}
