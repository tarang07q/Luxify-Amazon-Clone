import React, { useState, useRef, useEffect } from 'react';
import { FaGlobeAmericas, FaChevronDown } from 'react-icons/fa';
import { useCurrency } from '../../context/CurrencyContext';
import './CurrencySelector.css';

const CurrencySelector = ({ className = '', variant = 'default' }) => {
  const { currency, supportedCurrencies, changeCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCurrencyChange = (currencyCode) => {
    changeCurrency(currencyCode);
    setIsOpen(false);
  };

  // Determine classes based on variant
  const getButtonClasses = () => {
    switch (variant) {
      case 'minimal':
        return 'currency-selector-btn-minimal';
      case 'header':
        return 'currency-selector-btn-header';
      default:
        return 'currency-selector-btn-default';
    }
  };

  return (
    <div className={`currency-selector ${className}`} ref={dropdownRef}>
      <button
        className={`currency-selector-btn ${getButtonClasses()}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <FaGlobeAmericas className="currency-selector-icon" />
        <span className="currency-selector-code">{currency.code}</span>
        <FaChevronDown className={`currency-selector-arrow ${isOpen ? 'rotate' : ''}`} />
      </button>

      {isOpen && (
        <div className="currency-selector-dropdown">
          <div className="currency-selector-dropdown-header">
            Select Currency
          </div>
          <div className="currency-selector-dropdown-content">
            {supportedCurrencies.map((curr) => (
              <button
                key={curr.code}
                className={`currency-selector-option ${curr.code === currency.code ? 'active' : ''}`}
                onClick={() => handleCurrencyChange(curr.code)}
              >
                <span className="currency-selector-option-symbol">{curr.symbol}</span>
                <span className="currency-selector-option-code">{curr.code}</span>
                <span className="currency-selector-option-name">{curr.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
