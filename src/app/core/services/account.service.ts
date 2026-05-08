import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountRequest, AccountResponse } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly baseUrl = 'http://localhost:9202/api/accounts';

  constructor(private http: HttpClient) {}

  createAccount(account: AccountRequest): Observable<AccountResponse> {
    return this.http.post<AccountResponse>(this.baseUrl, account);
  }

  getAccountByNumber(accountNumber: string): Observable<AccountResponse> {
    return this.http.get<AccountResponse>(`${this.baseUrl}/${accountNumber}`);
  }

  getAccountsByCustomerId(customerId: number): Observable<AccountResponse[]> {
    return this.http.get<AccountResponse[]>(`${this.baseUrl}/customer/${customerId}`);
  }

  getAllAccounts(): Observable<AccountResponse[]> {
    return this.http.get<AccountResponse[]>(this.baseUrl);
  }
}
