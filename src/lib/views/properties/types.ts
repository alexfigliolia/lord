import type { Graph } from "$lib/graphing/Graph";
import type { ScaleLinear, ScaleTime } from "d3";

export interface PieData {
  label: string;
  value: number;
}

export interface GraphEvent {
  graph: Graph<number[], number[]>;
  xScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
}
