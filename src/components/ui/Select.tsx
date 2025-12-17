import 'styles/Select.css';
import { useEffect, useRef, useState } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const displayValue = value != null && value !== '' ? value : showAll ? 'All' : '';

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchValue('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchValue('');
    }
  };

  const handleOptionClick = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
    setSearchValue('');
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      setSearchValue('');
    } else if (event.key === 'Enter' && filteredOptions.length > 0) {
      handleOptionClick(filteredOptions[0]);
    }
  };

  const handleSelectKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelectClick();
    } else if (event.key === 'Escape' && isOpen) {
      setIsOpen(false);
      setSearchValue('');
    }
  };

  const handleOptionKeyDown = (event: React.KeyboardEvent, optionValue: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOptionClick(optionValue);
    }
  };

  return (
    <div className={`select-wrapper ${className}`} ref={wrapperRef}>
      <button
        type="button"
        className="select"
        onClick={handleSelectClick}
        onKeyDown={handleSelectKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="select-value">{displayValue}</span>
        <span className={`select-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="select-dropdown" role="listbox">
          <div className="select-search">
            <input
              ref={inputRef}
              type="text"
              className="select-search-input"
              placeholder="검색..."
              value={searchValue}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              onClick={e => e.stopPropagation()}
            />
            {searchValue && (
              <button
                type="button"
                className="select-search-clear"
                onClick={handleClearSearch}
                aria-label="검색어 지우기"
              >
                ×
              </button>
            )}
          </div>
          <div className="select-options">
            {showAll && (
              <div
                className={`select-option ${displayValue === 'All' ? 'selected' : ''}`}
                onClick={() => handleOptionClick('All')}
                onKeyDown={e => handleOptionKeyDown(e, 'All')}
                role="option"
                tabIndex={0}
                aria-selected={displayValue === 'All'}
              >
                All
              </div>
            )}
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option: string) => (
                <div
                  key={option}
                  className={`select-option ${value === option ? 'selected' : ''}`}
                  onClick={() => handleOptionClick(option)}
                  onKeyDown={e => handleOptionKeyDown(e, option)}
                  role="option"
                  tabIndex={0}
                  aria-selected={value === option}
                >
                  {option}
                </div>
              ))
            ) : (
              <div className="select-option disabled">검색 결과가 없습니다</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
