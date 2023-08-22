import type { OrganizationsByAffiliation_organizationStats } from "$lib/schema/OrganizationsByAffiliation";
import type { Residencies_residencies } from "$lib/schema/Residencies";
import type { UserFragment } from "$lib/schema/UserFragment";

export interface CoreLayoutData {
  user: UserFragment;
  residencies: Residencies_residencies[];
  organizations: OrganizationsByAffiliation_organizationStats[];
}
