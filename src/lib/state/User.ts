import type { User } from "$lib/authentication/types";
import { Hashing } from "$lib/generics/DataStructures/Hashing";
import { Factory } from "./Factory";
import { organization } from "./Organization";

export const currentUser = Factory.createWritable<User>("Current User");

export const usersHash = Factory.createDerived("Organization Users Hash", organization, v => {
  return Hashing.hashList(v?.users || [], "id");
});

export const users = Factory.createDerived("Organization Users", organization, v => {
  return v?.users || [];
});
