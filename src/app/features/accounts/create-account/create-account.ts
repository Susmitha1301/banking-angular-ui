import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../core/services/account.service';
import { AccountRequest, AccountResponse } from '../../../core/models/account.model';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-account.html',
  styleUrl: './create-account.css'
})
export class CreateAccountComponent {

  accountForm: FormGroup;
  createdAccount?: AccountResponse;
  successMessage = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
  ) {
    this.accountForm = this.fb.group({
      customerId: ['', [Validators.required, Validators.min(1)]],
      accountType: ['SAVINGS', Validators.required],
      initialDeposit: [0, [Validators.required, Validators.min(0)]]
    });
  }

  createAccount(): void {
    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.createdAccount = undefined;

    const request: AccountRequest = this.accountForm.value;

    this.accountService.createAccount(request).subscribe({
      next: (response) => {
        this.createdAccount = response;
        this.successMessage = 'Account created successfully';
        this.accountForm.reset({
          customerId: '',
          accountType: 'SAVINGS',
          initialDeposit: 0
        });
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to create account. Please check customer ID and backend service.';
        this.isLoading = false;
      }
    });
  }
}
