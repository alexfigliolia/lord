import type { UserFragment } from "$lib/schema/UserFragment";
import { Factory } from "./Factory";

export const currentUser = Factory.createWritable<UserFragment>("Current User");
