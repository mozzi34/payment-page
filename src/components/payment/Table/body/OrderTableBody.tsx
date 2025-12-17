import { Cell, DollarCell } from 'components/ui/Cell';
import type { ConsumptionRow } from 'data/type';
import { formatCurrency, formatNumber } from 'utils/number';
import 'styles/table/Body.css';

export function OrderTableBody({ row }: { row: ConsumptionRow }) {
  return (
    <div className="table-ordered-columns">
      <Cell>{row.consumption.salesOrder.styleNumber}</Cell>
      <Cell>{row.consumption.supplierItemCode}</Cell>
      <Cell>{row.consumption.fabricName}</Cell>
      <Cell>{row.consumption.colorName}</Cell>
      <Cell className="text-right">{formatNumber(row.consumption.orderQuantity)}</Cell>
      <Cell>{row.consumption.unit}</Cell>
      <DollarCell>{formatCurrency(row.consumption.unitPrice)}</DollarCell>
      <DollarCell>{formatCurrency(row.consumption.orderAmount)}</DollarCell>
    </div>
  );
}
