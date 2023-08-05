import { Factory } from "$lib/state/Factory";
import type { Issue, Property } from "$lib/types/derived";

export const property = Factory.createWritable<Property>("Active Property");

export const issues = Factory.createWritable<Issue[]>("Active Property Issues");
