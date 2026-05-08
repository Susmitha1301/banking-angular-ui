import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../../core/services/customer.service';
import { CustomerRequest } from '../../../core/models/customer.model';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-customer.html',
  styleUrl: './add-customer.css'
})
export class AddCustomerComponent {

  customerForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  submitCustomer(): void {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const customerRequest: CustomerRequest = this.customerForm.value;

    this.customerService.createCustomer(customerRequest).subscribe({ //here component triggers the service not he backend call but it just callls the method in service
      next: () => {
        this.successMessage = 'Customer created successfully';
        this.customerForm.reset();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to create customer. Please check backend service.';
        this.isLoading = false;
      }
    });
  }
}
