import { Cell, DollarCell } from 'components/ui/Cell';
import type { ConsumptionGroup, payments } from 'data/type';
import { formatCurrency, formatNumber } from 'utils/number';
import { getPaymentTotals } from 'utils/table';
import 'styles/table/Body.css';

export function GrandTotalPayment({
  consumptions,
  payment,
  paymentIdx,
}: {
  consumptions: ConsumptionGroup[];
  payment: payments;
  paymentIdx: number;
}) {
  const { totalQty, totalAmount } = getPaymentTotals(consumptions, paymentIdx);

  return (
    <div key={payment.id} className="table-payment-columns">
      <Cell className="text-right">{totalQty === 0 ? '' : formatNumber(totalQty)}</Cell>
      <Cell>
        <div></div>
      </Cell>
      <DollarCell>{totalAmount === 0 ? '' : formatCurrency(totalAmount)}</DollarCell>
    </div>
  );
}
