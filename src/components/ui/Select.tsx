import 'styles/Select.css';

type SelectProps = {
  placeholder?: string;
  className?: string;
  options: string[];
  value?: string | null;
  onChange?: (value: string) => void;
  showAll?: boolean;
};

export function Select({
  className = '',
  options = [],
  value = null,
  onChange,
  showAll = true,
}: SelectProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onChange?.(selectedValue);
  };

  const displayValue = value || (showAll ? 'All' : '');

  return (
    <div className={`select-wrapper ${className}`}>
      <select className="select" value={displayValue} onChange={handleChange}>
        {showAll && <option value="All">All</option>}
        {options.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
