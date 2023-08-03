import { extent, max } from "d3";
import type { IGraph, Margin } from "./types";

export class Graph<X extends any[], Y extends any[]> {
  xData: X;
  yData: Y;
  maxX = 0;
  maxY = 0;
  minX = 0;
  minY = 0;
  width: number;
  height: number;
  margin: Margin;
  graphWidth: number;
  graphHeight: number;
  constructor({ xData, yData, margin, height, width }: IGraph<X, Y>) {
    this.xData = xData;
    this.yData = yData;
    this.width = width;
    this.height = height;
    this.margin = margin || {
      top: 10,
      left: 40,
      right: 0,
      bottom: 30,
    };
    this.graphWidth = this.width - this.margin.left - this.margin.right;
    this.graphHeight = this.height - this.margin.top - this.margin.bottom;
  }

  public resize(height: number, width: number) {
    this.width = width;
    this.height = height;
    this.graphWidth = this.width - this.margin.left - this.margin.right;
    this.graphHeight = this.height - this.margin.top - this.margin.bottom;
  }

  public createScaleX<V, S extends (...args: any[]) => any = (...args: any[]) => any>(scale: S): V {
    const [minX, maxX] = extent(this.xData) as [number, number];
    this.minX = minX;
    this.maxX = maxX;
    return scale([minX, maxX], [this.margin.left, this.width - this.margin.right]);
  }

  public createScaleY<V, S extends (...args: any[]) => any = (...args: any[]) => any>(scale: S): V {
    const [minY, maxY] = extent(this.yData) as [number, number];
    this.minY = minY;
    this.maxY = maxY;
    return scale(
      [0, max(this.yData) as number],
      [this.height - this.margin.bottom, this.margin.top],
    ).nice();
  }

  public deriveFromMousePosition(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const { offsetX } = e;
    const { width } = target.getBoundingClientRect();
    const unit = width / this.xData.length;
    let i = 0;
    for (i; i < this.xData.length - 1; i++) {
      if (offsetX >= i * unit && offsetX < (i + 1) * unit) {
        break;
      }
    }
    return { x: this.xData[i], y: this.yData[i], index: i };
  }

  public get datum(): [number, number][] {
    return this.xData.map((x, i) => {
      return [x, this.yData[i]];
    });
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
