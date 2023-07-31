import type { Organization } from "$lib/types/derived";
import { Factory } from "./Factory";

export const organizations = Factory.createWritable<Organization[]>("Organizations", []);

export const organizationIndex = Factory.createWritable("Active Organization Index", 0);

export const organization = Factory.createDerived(
  "Active Organization",
  [organizations, organizationIndex],
  ([orgs, i]) => orgs[i],
);
