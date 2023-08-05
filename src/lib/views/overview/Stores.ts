import { Hashing } from "$lib/generics/DataStructures/Hashing";
import { Factory } from "$lib/state/Factory";
import type { Issue, PartialOrganization, Property, User } from "$lib/types/derived";

export const overviewOrganization =
  Factory.createWritable<PartialOrganization>("Overview Organization");

export const overviewIssues = Factory.createWritable<Issue[]>("Overview Issues", []);

export const overviewProperties = Factory.createWritable<Property[]>("Overview Properties", []);

export const overviewPropertiesHash = Factory.createDerived(
  "Properties Hash",
  overviewProperties,
  v => {
    return Hashing.hashList(v, "id");
  },
);

export const overviewUsers = Factory.createWritable<User[]>("Overview Users", []);

export const overviewUserHash = Factory.createDerived("Overview User Hash", overviewUsers, v => {
  return Hashing.hashList(v, "id");
});
