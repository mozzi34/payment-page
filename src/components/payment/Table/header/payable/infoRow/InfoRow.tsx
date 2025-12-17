import 'styles/table/payment/PaymentRow.css';

type InfoRowProps = {
  label: string;
  children: React.ReactNode;
};

export function InfoRow({ label, children }: InfoRowProps) {
  return (
    <div>
      <div className="payment-row-container">
        <div className="payment-row-title">{label}</div>
        <div className="payment-row-children">{children}</div>
      </div>
    </div>
  );
}
