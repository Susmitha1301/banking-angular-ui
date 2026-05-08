import { Routes } from '@angular/router';

import { CustomerListComponent } from './features/customers/customer-list/customer-list';
import { AddCustomerComponent } from './features/customers/add-customer/add-customer';
import { CustomerDetailsComponent } from './features/customers/customer-details/customer-details';
import { AccountDetailsComponent } from './features/accounts/account-details/account-details';

import { CustomerAccountsComponent } from './features/accounts/customer-accounts/customer-accounts';
import { CreateAccountComponent } from './features/accounts/create-account/create-account';

import { DepositComponent } from './features/transactions/deposit/deposit';
import { WithdrawComponent } from './features/transactions/withdraw/withdraw';
import { TransferComponent } from './features/transactions/transfer/transfer';
import { TransactionHistoryComponent } from './features/transactions/transaction-history/transaction-history';

export const routes: Routes = [
  { path: 'customers', component: CustomerListComponent },
  { path: 'add-customer', component: AddCustomerComponent },
  { path: 'customer-details/:id', component: CustomerDetailsComponent },

  { path: 'accounts', component: CustomerAccountsComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'account-details', component: AccountDetailsComponent },

  { path: 'deposit', component: DepositComponent },
  { path: 'withdraw', component: WithdrawComponent },
  { path: 'transfer', component: TransferComponent },
  { path: 'transactions', component: TransactionHistoryComponent },

  { path: '', redirectTo: 'customers', pathMatch: 'full' }
];
