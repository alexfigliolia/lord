import { Hashing } from "$lib/generics/DataStructures/Hashing";
import type { Property } from "$lib/types/derived";
import { Factory } from "./Factory";
import { organization } from "./Organization";

export const propertiesHash = Factory.createDerived("Properties Hash", organization, v => {
  return Hashing.hashList(v?.properties ?? [], "id");
});

export const properties = Factory.createDerived("Properties", organization, v => {
  return v?.properties ?? [];
});

export const activeProperty = Factory.createWritable<Property>("Active Property");
