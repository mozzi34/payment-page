import type { Consumption } from 'data/type';
import { Header } from './Header';
import { OrderedTable } from './orderedTable/OrderedTable';

export function ConsumptionSection({ consumptions }: { consumptions: Consumption[] }) {
  return (
    <div className="consumption-section">
      <Header />
      <div className="consumption-section-items">
        <OrderedTable consumptions={consumptions} />
      </div>
    </div>
  );
}
