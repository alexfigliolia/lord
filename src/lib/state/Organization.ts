import type { PartialOrganization } from "$lib/types/derived";
import { Factory } from "./Factory";

export const organizations = Factory.createWritable<PartialOrganization[]>("Organizations", []);
