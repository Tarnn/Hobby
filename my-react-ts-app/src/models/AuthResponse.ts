export interface AuthProfile {
  id: number;
  name: string;
  email: string;
}

export interface  AuthResponse {
  data: AuthProfile;
  message: string;
  error: string | null;
}
