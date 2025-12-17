export type paymentStatus = 'NOT_YET' | 'PENDING' | 'PAID';

export type CreateUser = {
  id: number;
  name: string;
  engName: string;
  profileImage: string;
};

export type payments = {
  id: number;
  paymentStatus: paymentStatus;
  paymentDueDate: string;
  requestedAt: string | null;
  pendingAt: string | null;
  paidAt: string | null;
  memo: string | null;
  sourcingFiles: string[];
  financeFiles: string[];
};

export type PaymentBreakdown = {
  id: string;
  type: string;
  shippedQuantity: number;
  unitPrice: number;
  amount: number;
  itemId: number;
  paymentId: number;
};

export type SalesOrder = {
  id: number;
  styleNumber: string;
  styleCode: string;
  createUser: CreateUser;
};

export type Consumption = {
  id: number;
  unitPrice: number;
  orderQuantity: number;
  orderAmount: number;
  fabricName: string;
  fabricClass: string;
  fabricDetail: string;
  supplierItemCode: string;
  brandItemCode: string | null;
  colorName: string;
  sopoNo: string;
  unit: string;
  garmentColorName: string;
  garmentSize: { id: number; name: string; orderNum: number };
  salesOrder: SalesOrder;
};

export type Payment = {
  payments: payments[];
  consumptions: Consumption[];
  paymentBreakdowns: PaymentBreakdown[];
};
