import { Button } from 'components/ui/Button';
import type { payments } from 'data/type';
import { PayableSection } from './payable/PayableSection';
import 'styles/table/Header.css';

export function HeaderSection({
  payments,
  handleClickOptionButton,
}: {
  payments: payments[];
  handleClickOptionButton: () => void;
}) {
  return (
    <div className="table-header">
      <div className="table-ordered-section">
        <div className="table-section-header ordered-section-header">
          <h2>Ordered</h2>
          <Button variant="outline" className="button--size-lg" onClick={handleClickOptionButton}>
            옵션 설정
          </Button>
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
