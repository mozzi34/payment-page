import { HeaderCell } from 'components/ui/Cell';
import type { payments } from 'data/type';
import React from 'react';
import 'styles/consumption/Order.css';

export function TableHeaderCells({ payments }: { payments: payments[] }) {
  return (
    <div className="ordered-table-header">
      <HeaderCell className="ordered-table-header-item">Style No.</HeaderCell>
      <HeaderCell className="ordered-table-header-item">Supplier Item #</HeaderCell>
      <HeaderCell className="ordered-table-header-item">Fabric Name</HeaderCell>
      <HeaderCell className="ordered-table-header-item">Fabric Color</HeaderCell>
      <HeaderCell className="ordered-table-header-item">Order Qty</HeaderCell>
      <HeaderCell className="ordered-table-header-item">Unit</HeaderCell>
      <HeaderCell className="ordered-table-header-item">U/price</HeaderCell>
      <HeaderCell className="ordered-table-header-item">Amount</HeaderCell>
      {payments.map(payment => (
        <React.Fragment key={payment.id}>
          <HeaderCell className="ordered-table-header-item">Shipped Qty</HeaderCell>
          <HeaderCell className="ordered-table-header-item">U/price</HeaderCell>
          <HeaderCell className="ordered-table-header-item">Amount</HeaderCell>
        </React.Fragment>
      ))}

      <HeaderCell className="ordered-table-header-item">Qty</HeaderCell>
      <HeaderCell className="ordered-table-header-item">Amount</HeaderCell>
    </div>
  );
}
