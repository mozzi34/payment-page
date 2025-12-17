import { Cell, DollarCell } from 'components/ui/Cell';
import type { ConsumptionRow, PaymentCell, payments } from 'data/type';
import { formatCurrency, formatNumber } from 'utils/number';
import 'styles/table/Body.css';

export function PaymentTableBody({ row, payments }: { row: ConsumptionRow; payments: payments[] }) {
  return (
    <>
      {row.cells.map((cell: PaymentCell, paymentIdx) => (
        <div key={payments[paymentIdx]?.id} className="table-payment-columns">
          <Cell className="text-right">
            {cell?.shippedQuantity ? formatNumber(cell?.shippedQuantity) : ''}
          </Cell>
          <DollarCell>{cell?.unitPrice ? formatCurrency(cell.unitPrice) : ''}</DollarCell>
          <DollarCell>{cell?.amount ? formatCurrency(cell.amount) : ''}</DollarCell>
        </div>
      ))}
    </>
  );
}
