import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  DepositRequest,
  WithdrawRequest,
  TransferRequest,
  TransactionResponse
} from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly baseUrl = 'http://localhost:9203/api/transactions';

  constructor(private http: HttpClient) {}

  deposit(request: DepositRequest): Observable<TransactionResponse> {
    return this.http.post<TransactionResponse>(`${this.baseUrl}/deposit`, request);
  }

  withdraw(request: WithdrawRequest): Observable<TransactionResponse> {
    return this.http.post<TransactionResponse>(`${this.baseUrl}/withdraw`, request);
  }

  transfer(request: TransferRequest): Observable<TransactionResponse> {
    return this.http.post<TransactionResponse>(`${this.baseUrl}/transfer`, request);
  }

  getTransactionHistory(accountNumber: string): Observable<TransactionResponse[]> {
    return this.http.get<TransactionResponse[]>(`${this.baseUrl}/history/${accountNumber}`);
  }

  getAllTransactions(): Observable<TransactionResponse[]> {
    return this.http.get<TransactionResponse[]>(this.baseUrl);
  }
}
