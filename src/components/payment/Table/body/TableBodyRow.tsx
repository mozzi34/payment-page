import type { ConsumptionRow, payments } from 'data/type';
import { OrderTableBody } from './OrderTableBody';
import { PaymentTableBody } from './PaymetnTableBody';
import { TotalTableBody } from './TotalTableBody';
import 'styles/table/Body.css';

export function TableBodyRow({ row, payments }: { row: ConsumptionRow; payments: payments[] }) {
  return (
    <div className="table-body-row">
      <OrderTableBody row={row} />
      <PaymentTableBody row={row} payments={payments} />
      <TotalTableBody row={row} />
    </div>
  );
}
