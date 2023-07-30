import type { Organization, Property } from "$lib/types/derived";
import { get } from "svelte/store";
import { Factory } from "./Factory";

export const organizations = Factory.createWritable<Organization[]>("Organizations", []);

export const organizationIndex = Factory.createWritable("Active Organization Index", 0);

export const organization = Factory.createDerived(
  "Active Organization",
  [organizations, organizationIndex],
  ([orgs, i]) => orgs[i],
);

export class OrganizationState {
  static appendProperty(property: Property) {
    organizations.update(v => {
      const index = get(organizationIndex);
      v[index].properties.push(property);
      return v;
    });
  }
}
