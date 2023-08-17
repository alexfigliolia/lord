import type { IssueFragment } from "$lib/schema/IssueFragment";
import type { PropertyByID_property } from "$lib/schema/PropertyByID";
import { Factory } from "$lib/state/Factory";

export const property = Factory.createWritable<PropertyByID_property>("Active Property");

export const issues = Factory.createWritable<IssueFragment[]>("Active Property Issues");
