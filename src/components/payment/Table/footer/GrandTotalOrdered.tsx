import { Cell, DollarCell } from 'components/ui/Cell';
import type { ConsumptionGroup } from 'data/type';
import { formatCurrency } from 'utils/number';
import 'styles/table/Footer.css';

export function GrandTotalOrdered({ consumptions }: { consumptions: ConsumptionGroup[] }) {
  const grandSubTotal = consumptions.reduce((sum, g) => sum + g.subTotalAmount, 0);

  return (
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
      <Cell className="table-footer-label">G.TTL</Cell>
      <DollarCell>{grandSubTotal === 0 ? '' : formatCurrency(grandSubTotal)}</DollarCell>
    </div>
  );
}
