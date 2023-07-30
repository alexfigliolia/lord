import { Factory } from "./Factory";
import { organization } from "./Organization";

export const properties = Factory.createDerived("Properties", organization, v => v.properties);
