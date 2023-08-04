import { Factory } from "$lib/state/Factory";
import type { Property } from "$lib/types/derived";

export const CurrentProperty = Factory.createWritable<Property>("Current Property");
