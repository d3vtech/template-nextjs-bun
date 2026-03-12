/**
 * TypeScript types and interfaces for the application.
 * Define API response shapes, domain models, and shared types here.
 */

/** Standard API error response shape. */
export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

/** Paginated API response wrapper. */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

/** Example domain model — replace with your actual models. */
export interface Item {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
