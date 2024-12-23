// src/api/userService.ts
import apiClient from "./index";
import { AuthResponse } from "../models/AuthResponse";
import { SignUpRequest } from "../models/SignUpRequest";

export interface User {
  id: number;
  name: string;
  email: string;
}

export const signUpGoogle = async (
  userData: Partial<User>
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    `/auth/signup/google`,
    userData
  );
  return response.data;
};

export const signUpFacebook = async (
  userData: Partial<User>
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    `/auth/signup/facebook`,
    userData
  );
  return response.data;
};

export const signUp = async (
  userData: SignUpRequest
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(`/auth/signup`, userData);
  return response.data;
};

export const logOut = async (): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(`/auth/logout`);
  return response.data;
};
