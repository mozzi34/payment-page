import type { ConsumptionGroup, payments } from 'data/type';
import { GrandTotalOrdered } from './footer/GrandTotalOrdered';
import { GrandTotalPayment } from './footer/GrandTotalPayment';
import { GrandTotalTotal } from './footer/GrandTotalTotal';
import 'styles/unifiedTable.css';

export function TableFooterCells({
  consumptions,
  payments,
}: {
  consumptions: ConsumptionGroup[];
  payments: payments[];
}) {
  return (
    <div className="table-body-row table-grandtotal-row">
      <GrandTotalOrdered consumptions={consumptions} />

      {payments.map((payment, paymentIdx) => (
        <GrandTotalPayment
          key={payment.id}
          consumptions={consumptions}
          payment={payment}
          paymentIdx={paymentIdx}
        />
      ))}

      <GrandTotalTotal consumptions={consumptions} />
    </div>
  );
}
