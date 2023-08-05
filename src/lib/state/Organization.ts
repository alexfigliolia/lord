import type { OrganizationStats } from "$lib/types/derived";
import { derived } from "svelte/store";
import { Factory } from "./Factory";

export const organizations = Factory.createWritable<OrganizationStats[]>("Organizations", []);

export const totalUsers = derived(organizations, v => {
  return v.reduce((acc, next) => acc + next._count.users, 0);
});

export const totalProperties = derived(organizations, v => {
  return v.reduce((acc, next) => acc + next._count.properties, 0);
});

export const totalIssues = derived(organizations, v => {
  return v.reduce((acc, next) => acc + next._count.issues, 0);
});
