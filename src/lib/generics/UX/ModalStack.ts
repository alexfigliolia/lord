import { EfficientStack } from "../DataStructures/EfficientStack";

export class ModalStack {
  public static stack = new EfficientStack<() => void>();

  public static push(item: () => void) {
    if (!this.stack.size) {
      this.bind();
    }
    return this.stack.push(item);
  }

  public static pop() {
    const item = this.stack.pop();
    if (item) {
      item();
    }
    if (!this.stack.size) {
      this.unbind();
    }
  }

  public static delete(ID: string) {
    this.stack.delete(ID);
  }

  private static bind() {
    window.addEventListener("keydown", this.onEscape);
  }

  private static unbind() {
    window.removeEventListener("keydown", this.onEscape);
  }

  private static onEscape = (e: KeyboardEvent) => {
    if (e.which === 27 || e.key === "Escape") {
      this.pop();
    }
  };
}
