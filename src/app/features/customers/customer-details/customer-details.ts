import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CustomerService } from '../../../core/services/customer.service';
import { CustomerResponse } from '../../../core/models/customer.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './customer-details.html',
  styleUrl: './customer-details.css'
})
export class CustomerDetailsComponent implements OnInit {

  customer?: CustomerResponse;
  errorMessage = '';
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.loadCustomer(id);
    } else {
      this.errorMessage = 'Invalid customer ID';
    }
  }

  loadCustomer(id: number): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.customerService.getCustomerById(id).subscribe({
      next: (data) => {
        this.customer = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message ||
          error?.error ||
          'Failed to load customer details.';
        this.isLoading = false;
      }
    });
  }
}
