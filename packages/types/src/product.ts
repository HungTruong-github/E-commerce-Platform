export type ProductStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export type Currency = 'USD' | 'EUR' | 'GBP';

export interface Money {
  amount: number; // Stored in smallest currency unit (e.g. cents)
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
