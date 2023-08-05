import type { User } from "$lib/types/derived";
import { Factory } from "./Factory";

export const currentUser = Factory.createWritable<User>("Current User");
