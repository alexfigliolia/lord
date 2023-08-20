import type { ExpenseFragment } from "$lib/schema/ExpenseFragment";
import type { IssueFragment } from "$lib/schema/IssueFragment";
import type {
  OrganizationByID_organization,
  OrganizationByID_organization_properties,
} from "$lib/schema/OrganizationByID";
import type { PaymentFragment } from "$lib/schema/PaymentFragment";
import type { UserFragment } from "$lib/schema/UserFragment";

export interface OverviewData {
  users: UserFragment[];
  issues: IssueFragment[];
  properties: OrganizationByID_organization_properties[];
  organization: PartialOrg;
  payments: PaymentFragment[];
  expenses: ExpenseFragment[];
}

export type PartialOrg = Pick<OrganizationByID_organization, "__typename" | "id" | "name">;
