import 'styles/payment/Badge.css';
import type { paymentStatus } from 'data/type';

export function Badge({ status }: { status: paymentStatus }) {
  return (
    <div className={`badge--${status}`}>
      <span>{status}</span>
    </div>
  );
}