import { derived } from "svelte/store";
import { organization } from "./Organization";

export const issues = derived(organization, v => v.issues);
