import type { OrganizationsByAffiliation_organizationStats } from "$lib/schema/OrganizationsByAffiliation";
import type { UserFragment } from "$lib/schema/UserFragment";

export interface CoreLayoutData {
  user: UserFragment;
  organizations: OrganizationsByAffiliation_organizationStats[];
}
