import { ModalStack } from "./ModalStack";

export class KeyboardAccessibility {
  close: () => void;
  dropdown?: HTMLElement;
  container?: HTMLElement;
  stackID: string | null = null;
  constructor(close: () => void) {
    this.close = close;
  }

  public onVisible() {
    if (!this.stackID) {
      this.stackID = ModalStack.push(this.close);
    }
    if (this.dropdown) {
      window.addEventListener("keydown", this.navigate);
    }
    if (this.container) {
      document.addEventListener("click", this.verifyTargetAndClose);
      document.addEventListener("focusin", this.verifyTargetAndClose);
    }
  }

  public onInvisible() {
    if (this.stackID) {
      ModalStack.delete(this.stackID);
      this.stackID = null;
    }
    if (this.dropdown) {
      window.removeEventListener("keydown", this.navigate);
    }
    if (this.container) {
      document.removeEventListener("click", this.verifyTargetAndClose);
      document.removeEventListener("focusin", this.verifyTargetAndClose);
    }
  }

  public verifyTargetAndClose = (e: FocusEvent) => {
    // @ts-ignore
    if (!this.contains(e.target)) {
      this.close();
    }
  };

  private contains(node: HTMLElement | ParentNode) {
    if (!this.container) {
      return false;
    }
    while (node?.parentNode) {
      if (node.parentNode === this.container) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  public navigate = (e: Event) => {
    // @ts-ignore
    if (e?.which === 38 || e?.key === "ArrowUp") {
      e.preventDefault();
      this.focusPreviousItem();
    }
    // @ts-ignore
    if (e?.which === 40 || e?.key === "ArrowDown") {
      e.preventDefault();
      this.focusNextItem();
    }
  };

  private focusNextItem() {
    if (!this.dropdown) {
      return;
    }
    const { buttons, focusedButton } = this.dropdownChildren;
    if (!focusedButton.length) {
      buttons[0].focus();
      return;
    }
    if (focusedButton[0].nextSibling?.nodeType === 1) {
      (focusedButton[0].nextSibling as HTMLElement).focus();
      return;
    }
    buttons[0].focus();
  }

  private focusPreviousItem() {
    if (!this.dropdown) {
      return;
    }
    const { buttons, focusedButton } = this.dropdownChildren;
    if (!focusedButton.length) {
      buttons[buttons.length - 1].focus();
      return;
    }
    if (focusedButton[0].previousSibling) {
      (focusedButton[0].previousSibling as HTMLElement).focus();
      return;
    }
    buttons[buttons.length - 1].focus();
  }

  private get dropdownChildren() {
    return {
      buttons: this.dropdown?.querySelectorAll("button") || [],
      focusedButton: this.dropdown?.querySelectorAll("button:focus") || [],
    };
  }
}
