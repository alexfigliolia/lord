import { derived } from "svelte/store";
import { organization } from "./Organization";

export const properties = derived(organization, v => v.properties);
