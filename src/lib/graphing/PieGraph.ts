import type { PieData } from "$lib/views/properties/types";
import {
  arc,
  pie,
  select,
  quantize,
  scaleOrdinal,
  type Arc,
  type Pie,
  interpolateSpectral,
} from "d3";
import type { IPieGraph } from "./types";

export class PieGraph {
  radius: number;
  data: PieData[];
  dimensions: number;
  Arc: Arc<any, PieData>;
  Pie: Pie<any, PieData>;
  constructor({ data, dimensions }: IPieGraph) {
    this.data = data;
    this.dimensions = dimensions;
    this.radius = dimensions / 2;
    this.Arc = this.generateArc();
    this.Pie = this.generatePie();
  }

  public buildLabels(node: SVGElement) {
    select(node)
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .selectAll()
      .data(this.Pie(this.data))
      .join("text")
      // @ts-ignore
      .attr("transform", d => `translate(${this.Arc.centroid(d) as number})`)
      .call(text =>
        text
          .append("tspan")
          .attr("y", "-0.4em")
          .attr("font-weight", "bold")
          .text(d => d.data.label),
      )
      .call(text =>
        text
          .filter(d => d.endAngle - d.startAngle > 0.25)
          .append("tspan")
          .attr("x", 0)
          .attr("y", "0.7em")
          .attr("fill-opacity", 0.7)
          .text(d => d.data.value.toLocaleString("en-US")),
      );
    return this;
  }

  private generateArc() {
    return arc<PieData>()
      .innerRadius(this.radius * 0.6)
      .outerRadius(this.radius - 1);
  }

  private generatePie() {
    return pie<PieData>()
      .padAngle(3 / this.radius)
      .sort(null)
      .value(d => d.value);
  }

  public static generateColorRange(data: PieData[]) {
    return scaleOrdinal<string>()
      .domain(data.map(d => d.label))
      .range(quantize<string>(t => interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());
  }
}
