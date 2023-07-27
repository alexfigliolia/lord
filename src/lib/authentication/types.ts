import type { RequestEvent } from "@sveltejs/kit";

export interface IVerifyCredentials {
  onError?: () => void | Promise<void>;
  onSuccess?: (user: User, request: RequestEvent) => User | Promise<User>;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}
