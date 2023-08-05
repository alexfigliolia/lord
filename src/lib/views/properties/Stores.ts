import { Factory } from "$lib/state/Factory";
import type { PropertyOverview } from "$lib/types/derived";

export const properties = Factory.createWritable<PropertyOverview[]>("Properties", []);
