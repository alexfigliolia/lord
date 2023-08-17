import type { UserFragment } from "$lib/schema/UserFragment";
import type { ServerLoadEvent } from "@sveltejs/kit";

export interface IVerifyCredentials<T> {
  onError?: () => void | Promise<void>;
  onSuccess?: (user: UserFragment, request: ServerLoadEvent) => T | Promise<T>;
}
