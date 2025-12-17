import { Cell, DollarCell } from 'components/ui/Cell';
import type { ConsumptionRow } from 'data/type';
import { formatCurrency, formatNumber } from 'utils/number';
import 'styles/table/Body.css';

export function TotalTableBody({ row }: { row: ConsumptionRow }) {
  const rowTotalQty = row.cells.reduce((sum, cell) => sum + (cell?.shippedQuantity ?? 0), 0);
  const rowTotalAmount = row.cells.reduce((sum, cell) => sum + (cell?.amount ?? 0), 0);

  return (
    <div className="table-total-columns">
      <Cell className="text-right">{rowTotalQty === 0 ? '' : formatNumber(rowTotalQty)}</Cell>
      <DollarCell>{rowTotalAmount === 0 ? '' : formatCurrency(rowTotalAmount)}</DollarCell>
    </div>
  );
}
