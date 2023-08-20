import { Hashing } from "$lib/generics/DataStructures/Hashing";
import type {
  PropertyByID_propertyUI,
  PropertyByID_propertyUI_expenses,
  PropertyByID_propertyUI_issues,
  PropertyByID_propertyUI_payments,
  PropertyByID_propertyUI_units,
} from "$lib/schema/PropertyByID";
import { Factory } from "$lib/state/Factory";

export const property = Factory.createWritable<PropertyByID_propertyUI>("Active Property");

export const issues = Factory.createWritable<PropertyByID_propertyUI_issues[]>(
  "Active Property Issues",
  [],
);

export const units = Factory.createWritable<PropertyByID_propertyUI_units[]>("Units", []);

export const unitsHash = Factory.createDerived("Units Hash", units, v => {
  return Hashing.hashList(v, "id");
});

export const expenses = Factory.createWritable<PropertyByID_propertyUI_expenses[]>("Expenses", []);

export const payments = Factory.createWritable<PropertyByID_propertyUI_payments[]>("Payments", []);
