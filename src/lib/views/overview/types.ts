import type { Issue, PartialOrganization, Property, User } from "$lib/types/derived";

export interface OverviewData {
  users: User[];
  issues: Issue[];
  properties: Property[];
  organization: PartialOrganization;
}
