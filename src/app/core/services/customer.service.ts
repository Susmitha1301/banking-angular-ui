import { Injectable } from '@angular/core'; ////allows angualr to create this service obj and inject it into components
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; //data will come later asynchronously
import { CustomerRequest, CustomerResponse } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly baseUrl = 'http://localhost:9201/api/customers'; //readonly we cant changeit later

  constructor(private http: HttpClient) {}

  createCustomer(customer: CustomerRequest): Observable<CustomerResponse> {
  //This method accepts customer data and later returns customer response from backend.
    return this.http.post<CustomerResponse>(this.baseUrl, customer);
    //this.http means http client obj used tomake api calls comes from http client injected <customer response> expected respnse from backwnd
    //this.baseurl means API URL and customer is request body
  }

  getCustomers(): Observable<CustomerResponse[]> {
    return this.http.get<CustomerResponse[]>(this.baseUrl);
  }

  getCustomerById(id: number): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>(`${this.baseUrl}/${id}`);
    //${this.baseUrl}/${id}`); this si called tempate literal
  }

  updateCustomer(id: number, customer: CustomerRequest): Observable<CustomerResponse> {
    return this.http.put<CustomerResponse>(`${this.baseUrl}/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}



//service methods return observable obj
//we can actual response in subscribe()
