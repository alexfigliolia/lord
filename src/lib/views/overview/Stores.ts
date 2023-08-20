import { Hashing } from "$lib/generics/DataStructures/Hashing";
import type { ExpenseFragment } from "$lib/schema/ExpenseFragment";
import type { IssueFragment } from "$lib/schema/IssueFragment";
import type { OrganizationByID_organization_properties } from "$lib/schema/OrganizationByID";
import type { PaymentFragment } from "$lib/schema/PaymentFragment";
import type { UserFragment } from "$lib/schema/UserFragment";
import { Factory } from "$lib/state/Factory";
import type { PartialOrg } from "./types";

export const overviewOrganization = Factory.createWritable<PartialOrg>("Overview Organization");

export const overviewIssues = Factory.createWritable<IssueFragment[]>("Overview Issues", []);

export const overviewExpenses = Factory.createWritable<ExpenseFragment[]>("Overview Expenses", []);

export const overviewPayments = Factory.createWritable<PaymentFragment[]>("Overview Payments", []);

export const overviewProperties = Factory.createWritable<
  OrganizationByID_organization_properties[]
>("Overview Properties", []);

export const overviewPropertiesHash = Factory.createDerived(
  "Properties Hash",
  overviewProperties,
  v => {
    return Hashing.hashList(v, "id");
  },
);

export const overviewUnits = Factory.createDerived("Overview Units", overviewProperties, v =>
  v.map(p => p.units).flat(),
);

export const overviewUsers = Factory.createWritable<UserFragment[]>("Overview Users", []);

export const overviewUserHash = Factory.createDerived("Overview User Hash", overviewUsers, v => {
  return Hashing.hashList(v, "id");
});
