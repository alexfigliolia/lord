import type { RequestEvent } from "@sveltejs/kit";

export interface IVerifyCredentials<T> {
  onError?: () => void | Promise<void>;
  onSuccess?: (user: User, request: RequestEvent) => T | Promise<T>;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}
