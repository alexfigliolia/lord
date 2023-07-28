import { Stack } from "./Stack";

export class CyclicStack<T> extends Stack<T> {
  public currentIndex = 0;

  public override peak() {
    return this[this.currentIndex];
  }

  public next() {
    if (this.atMax) {
      this.currentIndex = 0;
      return this[0];
    }
    this.currentIndex++;
    return this[this.currentIndex];
  }

  public previous() {
    if (this.currentIndex === 0) {
      this.currentIndex = this.length - 1;
      return this[this.currentIndex];
    }
    this.currentIndex--;
    return this[this.currentIndex];
  }

  public get atMax() {
    return this.currentIndex === this.length - 1;
  }
}
