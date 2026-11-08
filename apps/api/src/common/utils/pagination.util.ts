import type { PaginationMeta } from '@ecommerce/types';
import { PAGINATION_DEFAULTS } from '@ecommerce/shared';

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export function buildPaginationMeta(
  totalItems: number,
  page: number = PAGINATION_DEFAULTS.PAGE,
  limit: number = PAGINATION_DEFAULTS.LIMIT,
): PaginationMeta {
  const safeLimit = Math.min(Math.max(1, limit), PAGINATION_DEFAULTS.MAX_LIMIT);
  const safePage = Math.max(1, page);
  const totalPages = Math.ceil(totalItems / safeLimit) || 1;

  return {
    page: safePage,
    limit: safeLimit,
    totalItems,
    totalPages,
    hasNextPage: safePage < totalPages,
    hasPreviousPage: safePage > 1,
  };
}
