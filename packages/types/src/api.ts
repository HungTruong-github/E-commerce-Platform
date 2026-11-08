export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T = unknown> {
  success: boolean;
  data: T[];
  meta: PaginationMeta;
  timestamp: string;
}

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  error: string;
  message: string | string[];
  timestamp: string;
  path?: string;
}

export type SortOrder = 'asc' | 'desc';
