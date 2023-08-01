export class Stack<T> extends Array<T> {
  public initialize(...items: T[]) {
    this.push(...items);
  }

  public peak() {
    return this[this.length - 1];
  }
}
