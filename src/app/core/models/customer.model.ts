export interface CustomerRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface CustomerResponse {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  status: string
}
