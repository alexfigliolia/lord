import type { User } from "$lib/authentication/types";
import { Factory } from "./Factory";

export const CurrentUser = Factory.createWritable<User>("Current User");
