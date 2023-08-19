import { Hashing } from "$lib/generics/DataStructures/Hashing";
import type {
  PropertyByID_property,
  PropertyByID_property_issues,
  PropertyByID_property_units,
} from "$lib/schema/PropertyByID";
import { Factory } from "$lib/state/Factory";

export const property = Factory.createWritable<PropertyByID_property>("Active Property");

export const issues = Factory.createWritable<PropertyByID_property_issues[]>(
  "Active Property Issues",
  [],
);

export const units = Factory.createWritable<PropertyByID_property_units[]>("Units", []);

export const unitsHash = Factory.createDerived("Units Hash", units, v => {
  return Hashing.hashList(v, "id");
});
