import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CustomerService } from '../../../core/services/customer.service';
import { CustomerResponse } from '../../../core/models/customer.model';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
      error: () => {
        this.errorMessage = 'Failed to load customer details.';
        this.isLoading = false;
      }
    });
  }
}
