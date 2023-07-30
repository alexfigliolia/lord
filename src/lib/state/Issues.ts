import { Factory } from "./Factory";
import { organization } from "./Organization";

export const issues = Factory.createDerived("Issues", organization, v => v.issues);
