import React, { createContext, useState, useContext, useEffect } from 'react';

// Define supported currencies
export const SUPPORTED_CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'Mex$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' }
];

// Sample exchange rates (in a real app, these would come from an API)
export const EXCHANGE_RATES = {
  USD: { EUR: 0.92, GBP: 0.79, JPY: 149.50, CAD: 1.36, AUD: 1.52, INR: 83.12, CNY: 7.24, BRL: 5.05, RUB: 91.20, KRW: 1345.67, SGD: 1.35, NZD: 1.64, MXN: 17.25, CHF: 0.89 },
  EUR: { USD: 1.09, GBP: 0.86, JPY: 162.50, CAD: 1.48, AUD: 1.65, INR: 90.35, CNY: 7.87, BRL: 5.49, RUB: 99.12, KRW: 1463.21, SGD: 1.47, NZD: 1.78, MXN: 18.75, CHF: 0.97 },
  GBP: { USD: 1.27, EUR: 1.16, JPY: 189.24, CAD: 1.72, AUD: 1.92, INR: 105.23, CNY: 9.16, BRL: 6.39, RUB: 115.44, KRW: 1703.78, SGD: 1.71, NZD: 2.07, MXN: 21.84, CHF: 1.13 },
  JPY: { USD: 0.0067, EUR: 0.0062, GBP: 0.0053, CAD: 0.0091, AUD: 0.0102, INR: 0.56, CNY: 0.048, BRL: 0.034, RUB: 0.61, KRW: 9.00, SGD: 0.0090, NZD: 0.011, MXN: 0.12, CHF: 0.0060 },
  CAD: { USD: 0.74, EUR: 0.68, GBP: 0.58, JPY: 110.12, AUD: 1.12, INR: 61.27, CNY: 5.33, BRL: 3.72, RUB: 67.21, KRW: 991.67, SGD: 0.99, NZD: 1.21, MXN: 12.72, CHF: 0.66 },
  AUD: { USD: 0.66, EUR: 0.61, GBP: 0.52, JPY: 98.32, CAD: 0.89, INR: 54.69, CNY: 4.76, BRL: 3.32, RUB: 60.00, KRW: 885.31, SGD: 0.89, NZD: 1.08, MXN: 11.35, CHF: 0.59 },
  INR: { USD: 0.012, EUR: 0.011, GBP: 0.0095, JPY: 1.80, CAD: 0.016, AUD: 0.018, CNY: 0.087, BRL: 0.061, RUB: 1.10, KRW: 16.19, SGD: 0.016, NZD: 0.020, MXN: 0.21, CHF: 0.011 },
  CNY: { USD: 0.138, EUR: 0.127, GBP: 0.109, JPY: 20.65, CAD: 0.188, AUD: 0.210, INR: 11.48, BRL: 0.70, RUB: 12.60, KRW: 185.87, SGD: 0.186, NZD: 0.226, MXN: 2.38, CHF: 0.123 },
  BRL: { USD: 0.198, EUR: 0.182, GBP: 0.156, JPY: 29.60, CAD: 0.269, AUD: 0.301, INR: 16.46, CNY: 1.43, RUB: 18.06, KRW: 266.47, SGD: 0.267, NZD: 0.324, MXN: 3.42, CHF: 0.176 },
  RUB: { USD: 0.011, EUR: 0.010, GBP: 0.0087, JPY: 1.64, CAD: 0.015, AUD: 0.017, INR: 0.91, CNY: 0.079, BRL: 0.055, KRW: 14.76, SGD: 0.015, NZD: 0.018, MXN: 0.19, CHF: 0.0098 },
  KRW: { USD: 0.00074, EUR: 0.00068, GBP: 0.00059, JPY: 0.111, CAD: 0.0010, AUD: 0.0011, INR: 0.062, CNY: 0.0054, BRL: 0.0038, RUB: 0.068, SGD: 0.0010, NZD: 0.0012, MXN: 0.013, CHF: 0.00066 },
  SGD: { USD: 0.74, EUR: 0.68, GBP: 0.58, JPY: 110.74, CAD: 1.01, AUD: 1.12, INR: 61.57, CNY: 5.36, BRL: 3.74, RUB: 67.56, KRW: 996.79, NZD: 1.21, MXN: 12.78, CHF: 0.66 },
  NZD: { USD: 0.61, EUR: 0.56, GBP: 0.48, JPY: 91.16, CAD: 0.83, AUD: 0.93, INR: 50.68, CNY: 4.41, BRL: 3.08, RUB: 55.61, KRW: 820.53, SGD: 0.83, MXN: 10.52, CHF: 0.54 },
  MXN: { USD: 0.058, EUR: 0.053, GBP: 0.046, JPY: 8.67, CAD: 0.079, AUD: 0.088, INR: 4.82, CNY: 0.42, BRL: 0.29, RUB: 5.29, KRW: 78.01, SGD: 0.078, NZD: 0.095, CHF: 0.052 },
  CHF: { USD: 1.12, EUR: 1.03, GBP: 0.88, JPY: 167.98, CAD: 1.53, AUD: 1.70, INR: 93.39, CNY: 8.13, BRL: 5.67, RUB: 102.47, KRW: 1511.99, SGD: 1.52, NZD: 1.84, MXN: 19.38 }
};

// Create the currency context
const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  // Get the default currency from localStorage or use USD
  const [currency, setCurrency] = useState(() => {
    const savedCurrency = localStorage.getItem('preferred_currency');
    return savedCurrency ? JSON.parse(savedCurrency) : SUPPORTED_CURRENCIES[0];
  });

  // Save currency preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('preferred_currency', JSON.stringify(currency));
  }, [currency]);

  // Function to convert price from USD to selected currency
  const convertPrice = (priceInUSD) => {
    if (currency.code === 'USD') return priceInUSD;
    
    const rate = EXCHANGE_RATES.USD[currency.code] || 1;
    return priceInUSD * rate;
  };

  // Function to format price with currency symbol
  const formatPrice = (price) => {
    const convertedPrice = convertPrice(price);
    return `${currency.symbol}${convertedPrice.toFixed(2)}`;
  };

  // Function to change the currency
  const changeCurrency = (currencyCode) => {
    const newCurrency = SUPPORTED_CURRENCIES.find(c => c.code === currencyCode);
    if (newCurrency) {
      setCurrency(newCurrency);
    }
  };

  const value = {
    currency,
    supportedCurrencies: SUPPORTED_CURRENCIES,
    changeCurrency,
    convertPrice,
    formatPrice
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Custom hook to use the currency context
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
