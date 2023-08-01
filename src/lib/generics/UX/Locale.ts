import { browser } from "$app/environment";

export class Locale {
  static get() {
    if (browser) {
      return window?.navigator?.languages[0] || window?.navigator?.language || "en-US";
    }
    return "en-US";
  }
}
