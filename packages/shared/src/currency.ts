import type { Money, Currency } from '@ecommerce/types';

/**
 * Formats a money object (with cents) into a human-readable currency string.
 */
export function formatMoney(money: Money, locale: string = 'en-US'): string {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: money.currency,
  });
  return formatter.format(money.amount / 100);
}

/**
 * Creates a money object from dollars/units (converts to integer cents).
 */
export function createMoney(amountUnits: number, currency: Currency = 'USD'): Money {
  return {
    amount: Math.round(amountUnits * 100),
    currency,
  };
}
