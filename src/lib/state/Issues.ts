import { Hashing } from "$lib/generics/Hashing";
import { Factory } from "./Factory";
import { organization } from "./Organization";

export const issuesHash = Factory.createDerived("Issues", organization, v => {
  return Hashing.hashList(v?.issues || [], "id");
});

export const issues = Factory.createDerived("Issues", organization, v => {
  return v?.issues || [];
});
