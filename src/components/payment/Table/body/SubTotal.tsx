import { Cell, DollarCell } from 'components/ui/Cell';
import type { ConsumptionGroup, payments } from 'data/type';
import { formatCurrency, formatNumber } from 'utils/number';
import 'styles/table/Body.css';

export function SubTotal({ group, payments }: { group: ConsumptionGroup; payments: payments[] }) {
  return (
    <div className="table-body-row table-subtotal-row">
      <div className="table-ordered-columns">
        <Cell>
          <div></div>
        </Cell>
        <Cell>
          <div></div>
        </Cell>
        <Cell>
          <div></div>
        </Cell>
        <Cell className="table-subtotal-label">Sub TTL</Cell>
        <DollarCell>
          {group.subTotalAmount === 0 ? '' : formatCurrency(group.subTotalAmount)}
        </DollarCell>
      </div>

      {payments.map((payment, paymentIdx) => {
        const groupPaymentQty = group.rows.reduce(
          (sum, r) => sum + (r.cells[paymentIdx]?.shippedQuantity ?? 0),
          0
        );
        const groupPaymentAmount = group.rows.reduce(
          (sum, r) => sum + (r.cells[paymentIdx]?.amount ?? 0),
          0
        );

        return (
          <div key={payment.id} className="table-payment-columns">
            <Cell className="text-right">
              {groupPaymentQty === 0 ? '' : formatNumber(groupPaymentQty)}
            </Cell>
            <Cell>
              <div></div>
            </Cell>
            <DollarCell>
              {groupPaymentAmount === 0 ? '' : formatCurrency(groupPaymentAmount)}
            </DollarCell>
          </div>
        );
      })}

      <div className="table-total-columns">
        <Cell className="text-right">
          {(() => {
            const totalQty = group.rows.reduce(
              (sum, r) =>
                sum + r.cells.reduce((cellSum, cell) => cellSum + (cell?.shippedQuantity ?? 0), 0),
              0
            );
            return totalQty === 0 ? '' : formatNumber(totalQty);
          })()}
        </Cell>
        <DollarCell>
          {(() => {
            const totalAmount = group.rows.reduce(
              (sum, r) => sum + r.cells.reduce((cellSum, cell) => cellSum + (cell?.amount ?? 0), 0),
              0
            );
            return totalAmount === 0 ? '' : formatCurrency(totalAmount);
          })()}
        </DollarCell>
      </div>
    </div>
  );
}
