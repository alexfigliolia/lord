import { AutoIncrementingID } from "@figliolia/event-emitter";

export class EfficientQueue<T> extends Map<string, T> {
  private IDs = new AutoIncrementingID();

  public enqueue(item: T) {
    const ID = this.IDs.get();
    this.set(ID, item);
    return ID;
  }

  public dequeue() {
    const items = Array.from(this.entries());
    if (!items.length) {
      return;
    }
    const [ID, item] = items[0];
    this.delete(ID);
    return item;
  }
}
