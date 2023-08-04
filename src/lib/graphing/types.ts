import type { Graph } from "$lib/graphing/Graph";
import type { ScaleLinear, ScaleTime, PieArcDatum } from "d3";

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
}

export interface PieData {
  label: string;
  value: number;
}

export interface GraphEvent {
  graph: Graph<number[], number[]>;
  xScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
}
