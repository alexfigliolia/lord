import type { Organization } from "$lib/types/derived";
import { derived, writable } from "svelte/store";

export const organizations = writable<Organization[]>([]);

export const organizationIndex = writable(0);

export const organization = derived([organizations, organizationIndex], ([orgs, i]) => orgs[i]);
