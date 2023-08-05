import type { User } from "$lib/types/derived";
import type { ServerLoadEvent } from "@sveltejs/kit";

export interface IVerifyCredentials<T> {
  onError?: () => void | Promise<void>;
  onSuccess?: (user: User, request: ServerLoadEvent) => T | Promise<T>;
}
