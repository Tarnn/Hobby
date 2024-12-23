// src/api/userService.ts
import apiClient from "./index";

export interface User {
  id: number;
  name: string;
  email: string;
}

export const signUpGoogle = async (userData: Partial<User>): Promise<User> => {
  const response = await apiClient.post<User>(`/auth/signup/google`, userData);
  return response.data;
};

export const signUpFacebook = async (
  userData: Partial<User>
): Promise<User> => {
  const response = await apiClient.post<User>(
    `/auth/signup/facebook`,
    userData
  );
  return response.data;
};

export const signUp = async (userData: Partial<User>): Promise<User> => {
  const response = await apiClient.post<User>(`/auth/signup`, userData);
  return response.data;
};
