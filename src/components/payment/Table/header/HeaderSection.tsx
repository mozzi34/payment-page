import type { payments } from 'data/type';
import { PayableSection } from './payable/PayableSection';
import 'styles/table/Header.css';

export function HeaderSection({ payments }: { payments: payments[] }) {
  return (
    <div className="table-header">
      {/* Ordered 헤더 */}
      <div className="table-ordered-section">
        <div className="table-section-header">
          <h2>Ordered</h2>
        </div>
      </div>

      <PayableSection payments={payments} />

      <div className="table-total-section table-total-info">
        <div className="table-section-header">
          <h2>Total</h2>
        </div>
      </div>
    </div>
  );
}
