import { Factory } from "$lib/state/Factory";

export const menuOpen = Factory.createWritable("Mobile Menu Open", false);

export class LayoutState {
  static toggleMenu() {
    menuOpen.update(v => !v);
  }
}
