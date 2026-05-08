export interface DepositRequest {
  accountNumber: string;
  amount: number;
}

export interface WithdrawRequest {
  accountNumber: string;
  amount: number;
}

export interface TransferRequest {
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number;
}

export interface TransactionResponse {
  id: number;
  fromAccountNumber: string;
  toAccountNumber: string;
  transactionType: string;
  amount: number;
  status: string;
  transactionDate: string;
}
