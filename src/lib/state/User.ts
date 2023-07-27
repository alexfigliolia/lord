import type { User } from "$lib/authentication/types";
import { writable } from "svelte/store";

export const CurrentUser = writable<User>();
