import { writable } from "svelte/store";

export const dataPoint = writable(0);
export const pointDate = writable(0);
export const prevPoint = writable(0);
export const positionX = writable(0);
export const positionY = writable(0);
export const flip = writable(false);
export const labelActive = writable(false);
