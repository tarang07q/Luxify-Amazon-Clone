import React, { useState, useRef, useEffect } from 'react';
import { FaGlobeAmericas, FaChevronDown } from 'react-icons/fa';
import { useCurrency } from '../../context/CurrencyContext';
import './CurrencySelector.css';
import { useTheme } from '../../context/ThemeContext';

const CurrencySelector = ({ className = '', variant = 'default' }) => {
  const { currency, supportedCurrencies, changeCurrency } = useCurrency();
  const { theme, currentTheme } = useTheme();
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

  // Apply theme-specific styles
  const themeStyles = {
    button: {
      color: theme.navText,
      backgroundColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(80, 70, 229, 0.1)',
      border: currentTheme === 'dark' ? '1px solid rgba(0, 242, 255, 0.2)' : '1px solid rgba(80, 70, 229, 0.2)',
      borderRadius: '8px',
      padding: '0.5rem 0.75rem',
    },
    dropdown: {
      backgroundColor: theme.cardBg,
      border: currentTheme === 'dark' ? '1px solid rgba(0, 242, 255, 0.2)' : '1px solid rgba(80, 70, 229, 0.2)',
      boxShadow: theme.shadow,
    },
    header: {
      backgroundColor: currentTheme === 'dark' ? 'rgba(20, 21, 57, 0.8)' : 'rgba(249, 250, 251, 0.8)',
      color: theme.text,
      borderBottom: `1px solid ${theme.border}`,
    },
    option: {
      color: theme.text,
      borderBottom: `1px solid ${theme.border}`,
      backgroundColor: 'transparent',
    },
    activeOption: {
      backgroundColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(80, 70, 229, 0.1)',
    },
    hoverOption: {
      backgroundColor: currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.05)' : 'rgba(80, 70, 229, 0.05)',
    },
    symbol: {
      color: theme.primary,
    },
    code: {
      color: theme.text,
    },
    name: {
      color: theme.textLight,
    }
  };

  return (
    <div className={`currency-selector ${className}`} ref={dropdownRef}>
      <button
        className={`currency-selector-btn ${getButtonClasses()}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        style={variant === 'header' ? themeStyles.button : {}}
      >
        <FaGlobeAmericas className="currency-selector-icon" />
        <span className="currency-selector-code">{currency.code}</span>
        <FaChevronDown className={`currency-selector-arrow ${isOpen ? 'rotate' : ''}`} />
      </button>

      {isOpen && (
        <div className="currency-selector-dropdown" style={variant === 'header' ? themeStyles.dropdown : {}}>
          <div className="currency-selector-dropdown-header" style={variant === 'header' ? themeStyles.header : {}}>
            Select Currency
          </div>
          <div className="currency-selector-dropdown-content">
            {supportedCurrencies.map((curr) => (
              <button
                key={curr.code}
                className={`currency-selector-option ${curr.code === currency.code ? 'active' : ''}`}
                style={{
                  ...variant === 'header' ? themeStyles.option : {},
                  ...(curr.code === currency.code && variant === 'header') ? themeStyles.activeOption : {}
                }}
                onClick={() => handleCurrencyChange(curr.code)}
              >
                <span className="currency-selector-option-symbol" style={variant === 'header' ? themeStyles.symbol : {}}>{curr.symbol}</span>
                <span className="currency-selector-option-code" style={variant === 'header' ? themeStyles.code : {}}>{curr.code}</span>
                <span className="currency-selector-option-name" style={variant === 'header' ? themeStyles.name : {}}>{curr.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
