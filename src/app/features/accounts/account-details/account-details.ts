import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../core/services/account.service';
import { AccountResponse } from '../../../core/models/account.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './account-details.html',
  styleUrl: './account-details.css'
})
export class AccountDetailsComponent {

  searchForm: FormGroup;
  account?: AccountResponse;
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
  ) {
    this.searchForm = this.fb.group({
      accountNumber: ['', Validators.required]
    });
  }

  searchAccount(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.account = undefined;

    const accountNumber = this.searchForm.value.accountNumber;

    this.accountService.getAccountByNumber(accountNumber).subscribe({
      next: (response) => {
        this.account = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message ||
          error?.error ||
          'Account not found or backend service failed.';
        this.isLoading = false;
      }
    });
  }
}
