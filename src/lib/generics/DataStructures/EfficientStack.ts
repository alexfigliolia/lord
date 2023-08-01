import { AutoIncrementingID } from "@figliolia/event-emitter";

export class EfficientStack<T> extends Map<string, T> {
  private IDs = new AutoIncrementingID();

  public push(item: T) {
    const ID = this.IDs.get();
    this.set(ID, item);
    return ID;
  }

  public pop() {
    const items = Array.from(this.entries());
    if (!items.length) {
      return;
    }
    const [ID, item] = items[this.size - 1];
    this.delete(ID);
    return item;
  }

  public reverse() {
    const newStack = new EfficientStack<T>();
    const items = Array.from(this.entries());
    items.reverse().forEach(([ID, item]) => {
      newStack.set(ID, item);
    });
    return newStack;
  }
}
