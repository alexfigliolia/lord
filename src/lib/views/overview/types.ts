import type { IssueFragment } from "$lib/schema/IssueFragment";
import type { OrganizationByID_organization } from "$lib/schema/OrganizationByID";
import type { PropertyByID_property } from "$lib/schema/PropertyByID";
import type { UserFragment } from "$lib/schema/UserFragment";

export interface OverviewData {
  users: UserFragment[];
  issues: IssueFragment[];
  properties: PropertyByID_property[];
  organization: PartialOrg;
}

export type PartialOrg = Pick<OrganizationByID_organization, "__typename" | "id" | "name">;
