import type { User } from "$lib/authentication/types";
import { Factory } from "./Factory";
import { organization } from "./Organization";

export const currentUser = Factory.createWritable<User>("Current User");

export const users = Factory.createDerived("organization users", organization, v => {
  return v?.users || [];
});
