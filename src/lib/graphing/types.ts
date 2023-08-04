import type { PieData } from "$lib/views/properties/types";
import type { PieArcDatum } from "d3";

export interface Margin {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export interface IGraph<X extends any[], Y extends any[]> {
  xData: X;
  yData: Y;
  width: number;
  height: number;
  margin?: Margin;
}

export interface Coordinate {
  x: number;
  y: number;
}

export type ColorFunc = (dataPoint: PieArcDatum<PieData>) => string;

export interface IPieGraph {
  data: PieData[];
  dimensions: number;
  colorFN: ColorFunc;
}
