import type { payments } from 'data/type';
import { formatDate } from 'utils/date';
import { Header } from './Header';
import { AttachmentFile } from './infoRow/AttachmentFile';
import { Badge } from './infoRow/Badge';
import { InfoRow } from './infoRow/InfoRow';
import 'styles/table/payment/PayableSection.css';

export function PayableSection({ payments }: { payments: payments[] }) {
  return (
    <div className="payment-section">
      <Header />
      <div className="payment-section-items">
        {payments.map((payment: payments) => (
          <div className="payment-section-item" key={payment.id}>
            <InfoRow label="Payment Due">
              <div>{formatDate(payment.paymentDueDate)}</div>
            </InfoRow>
            <InfoRow label="Payment Date">
              <div className="payment-section-item-payment-date-container">
                {formatDate(payment.paymentDueDate)}
                <Badge status={payment.paymentStatus} />
              </div>
            </InfoRow>
            <InfoRow label="Attachment">
              <AttachmentFile files={payment.sourcingFiles} />
            </InfoRow>
            <InfoRow label="Memo">
              <div className="payment-section-item-memo-container">{payment.memo}</div>
            </InfoRow>
          </div>
        ))}
      </div>
    </div>
  );
}
