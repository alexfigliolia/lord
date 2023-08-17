import { Hashing } from "$lib/generics/DataStructures/Hashing";
import type { IssueFragment } from "$lib/schema/IssueFragment";
import type { OrganizationByID_organization_issues } from "$lib/schema/OrganizationByID";
import type { PropertyByID_property } from "$lib/schema/PropertyByID";
import type { UserFragment } from "$lib/schema/UserFragment";
import { Factory } from "$lib/state/Factory";
import type { PartialOrg } from "./types";

export const overviewOrganization = Factory.createWritable<PartialOrg>("Overview Organization");

export const overviewIssues = Factory.createWritable<IssueFragment[]>("Overview Issues", []);

export const overviewProperties = Factory.createWritable<PropertyByID_property[]>(
  "Overview Properties",
  [],
);

export const overviewPropertiesHash = Factory.createDerived(
  "Properties Hash",
  overviewProperties,
  v => {
    return Hashing.hashList(v, "id");
  },
);

export const overviewUsers = Factory.createWritable<UserFragment[]>("Overview Users", []);

export const overviewUserHash = Factory.createDerived("Overview User Hash", overviewUsers, v => {
  return Hashing.hashList(v, "id");
});
