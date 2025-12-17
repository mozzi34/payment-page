import 'styles/Cell.css';

type HeaderCellProps = {
  children: React.ReactNode;
  className?: string;
};

type CellProps = {
  children: React.ReactNode;
  className?: string;
};

type DollarCellProps = {
  children: React.ReactNode;
  className?: string;
};

export function HeaderCell({ children, className = '' }: HeaderCellProps) {
  return <div className={`header-cell ${className}`}>{children}</div>;
}

export function Cell({ children, className = '' }: CellProps) {
  return <div className={`cell ${className}`}>{children}</div>;
}

export function DollarCell({ children, className = '' }: DollarCellProps) {
  if (children === '') {
    return <div className={`dollar-cell cell ${className}`}></div>;
  }

  return (
    <div className={`dollar-cell cell ${className}`}>
      <p>$</p> <p>{children}</p>
    </div>
  );
}
