/**
 * Business logic and service layer.
 * Services encapsulate API calls and data transformations.
 * Pages and hooks should call services, not the API client directly.
 */
import { apiClient } from '@/api';
import type { Item, PaginatedResponse } from '@/models';

export async function getItems(page = 1, pageSize = 20): Promise<PaginatedResponse<Item>> {
  const response = await apiClient.get<PaginatedResponse<Item>>('/items', {
    params: { page, pageSize },
  });
  return response.data;
}

export async function getItemById(id: string): Promise<Item> {
  const response = await apiClient.get<Item>(`/items/${id}`);
  return response.data;
}
