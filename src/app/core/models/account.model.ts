export interface AccountRequest {  //data angular sends to backend
  customerId: number;
  accountType: string;
  initialDeposit: number;
}

export interface AccountResponse{  //Data angular receibves from backend
  accountNumber: string;
  customerId: number;
  accountType: string;
  balance: number;
  status: string;
}













