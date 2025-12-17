import { Cell, DollarCell } from 'components/ui/Cell';
import type { ConsumptionGroup } from 'data/type';
import { formatCurrency, formatNumber } from 'utils/number';
import { sumCells } from 'utils/table';
import 'styles/table/Body.css';

export function GrandTotalTotal({ consumptions }: { consumptions: ConsumptionGroup[] }) {
  const grandTotalQty = sumCells(consumptions, cell => cell?.shippedQuantity ?? 0);
  const grandTotalAmount = sumCells(consumptions, cell => cell?.amount ?? 0);

  return (
    <div className="table-total-columns">
      <Cell className="text-right">{grandTotalQty === 0 ? '' : formatNumber(grandTotalQty)}</Cell>
      <DollarCell>{grandTotalAmount === 0 ? '' : formatCurrency(grandTotalAmount)}</DollarCell>
    </div>
  );
}
