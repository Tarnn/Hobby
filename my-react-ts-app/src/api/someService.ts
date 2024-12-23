// src/api/userService.ts
import apiClient from './index';

export interface User {
  id: number;
  name: string;
  email: string;
}

export const fetchUser = async (userId: number): Promise<User> => {
  const response = await apiClient.get<User>(`api/users/${userId}`);
  return response.data;
};

export const updateUser = async (userId: number, userData: Partial<User>): Promise<User> => {
  const response = await apiClient.put<User>(`api/users/${userId}`, userData);
  return response.data;
};