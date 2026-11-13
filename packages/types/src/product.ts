export type ProductStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export type Currency = 'VND' | 'USD' | 'EUR' | 'GBP';

export interface Money {
  amount: number; // Integer monetary amount (e.g., VND whole units, or cents for decimal currencies like USD)
  currency: Currency;
}

export interface ProductSummary {
  id: string;
  sku: string;
  name: string;
  slug: string;
  price: Money;
  status: ProductStatus;
  stockQuantity: number;
  imageUrl?: string;
}
