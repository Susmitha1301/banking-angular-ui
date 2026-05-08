import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../core/services/account.service';
import { AccountResponse } from '../../../core/models/account.model';
import { RouterLink} from '@angular/router'

@Component({
  selector: 'app-customer-accounts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-accounts.html',
  styleUrl: './customer-accounts.css'
})
export class CustomerAccountsComponent {

  customerForm: FormGroup;
  accounts: AccountResponse[] = [];
  errorMessage = '';
  isLoading = false;
  searched = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
  ) {
    this.customerForm = this.fb.group({
      customerId: ['', [Validators.required, Validators.min(1)]]
    });
  }

  loadAccountsByCustomer(): void {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.accounts = [];
    this.searched = true;

    const customerId = this.customerForm.value.customerId;

    this.accountService.getAccountsByCustomerId(customerId).subscribe({
      next: (response) => {
        this.accounts = response;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load accounts for this customer.';
        this.isLoading = false;
      }
    });
  }
}
