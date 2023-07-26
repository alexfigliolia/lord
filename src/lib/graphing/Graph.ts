import type { IGraph, Margin } from "./types";

export class Graph<T extends Record<string, any>[]> {
  data: T;
  width: number;
  height: number;
  margin: Margin;
  graphWidth: number;
  graphHeight: number;
  constructor({ data, margin, height, width }: IGraph<T>) {
    this.data = data;
    this.width = width;
    this.height = height;
    this.margin = margin || {
      top: 10,
      right: 0,
      bottom: 30,
      left: 30,
    };
    this.graphWidth = this.width - this.margin.left - this.margin.right;
    this.graphHeight = this.height - this.margin.top - this.margin.bottom;
  }

  public get xAxisTicks() {
    return this.graphWidth / 80;
  }

  public get yAxisTicks() {
    return this.graphHeight / 40;
  }

  public get xAxisTranslation() {
    return this.height - this.margin.bottom;
  }

  public get yAxisTranslation() {
    return this.margin.left;
  }
}
