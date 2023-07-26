import { writable } from "svelte/store";

export const menuOpen = writable(false);

export class LayoutState {
  static toggleMenu() {
    menuOpen.update(v => !v);
  }
}
