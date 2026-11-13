import type { Money, Currency } from '@ecommerce/types';

/**
 * Formats a money object into a human-readable currency string.
 * For VND (zero-decimal currency), amount is treated as whole VND integer units.
 * For decimal currencies (USD, EUR, GBP), amount is treated as cents/subunits.
 */
export function formatMoney(money: Money, locale?: string): string {
  const defaultLocale = money.currency === 'VND' ? 'vi-VN' : 'en-US';
  const effectiveLocale = locale || defaultLocale;
  const isZeroDecimal = money.currency === 'VND';
  const value = isZeroDecimal ? money.amount : money.amount / 100;

  const formatter = new Intl.NumberFormat(effectiveLocale, {
    style: 'currency',
    currency: money.currency,
    maximumFractionDigits: isZeroDecimal ? 0 : 2,
  });
  return formatter.format(value);
}

/**
 * Creates a money object.
 * For VND, amountUnits is stored directly as an integer.
 * For decimal currencies, amountUnits is converted to integer cents.
 */
export function createMoney(amountUnits: number, currency: Currency = 'VND'): Money {
  const isZeroDecimal = currency === 'VND';
  return {
    amount: isZeroDecimal ? Math.round(amountUnits) : Math.round(amountUnits * 100),
    currency,
  };
}
