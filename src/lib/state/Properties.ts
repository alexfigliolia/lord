import { Hashing } from "$lib/generics/Hashing";
import { Factory } from "./Factory";
import { organization } from "./Organization";

export const propertiesHash = Factory.createDerived("Properties", organization, v => {
  return Hashing.hashList(v?.properties ?? [], "id");
});

export const properties = Factory.createDerived("Properties", organization, v => {
  return v?.properties ?? [];
});
