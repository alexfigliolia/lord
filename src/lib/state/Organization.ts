import type { Organization, Property } from "$lib/types/derived";
import { derived, get, writable } from "svelte/store";

export const organizations = writable<Organization[]>([]);

export const organizationIndex = writable(0);

export const organization = derived([organizations, organizationIndex], ([orgs, i]) => orgs[i]);

export class OrganizationState {
  static appendProperty(property: Property) {
    organizations.update(v => {
      const index = get(organizationIndex);
      v[index].properties.push(property);
      return v;
    });
  }
}
