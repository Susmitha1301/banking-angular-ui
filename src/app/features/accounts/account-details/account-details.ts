import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../core/services/account.service';
import { AccountResponse } from '../../../core/models/account.model';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
      error: () => {
        this.errorMessage = 'Account not found or backend service failed.';
        this.isLoading = false;
      }
    });
  }
}
