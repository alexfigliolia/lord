import type { PropertiesByOrg_properties } from "$lib/schema/PropertiesByOrg";
import { Factory } from "$lib/state/Factory";

export const properties = Factory.createWritable<PropertiesByOrg_properties[]>("Properties", []);
