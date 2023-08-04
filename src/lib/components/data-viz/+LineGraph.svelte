<script lang="ts">
  import {
    axisLeft,
    scaleTime,
    axisBottom,
    scaleLinear,
    type ScaleTime,
    type ScaleLinear,
  } from "d3";
  import { Graph } from "$lib/graphing/Graph";
  import { writable, type Writable } from "svelte/store";
  import Axis from "$lib/components/data-viz/+Axis.svelte";
  import Grid from "$lib/components/data-viz/+Grid.svelte";
  import type { GraphEvent } from "$lib/views/properties/types";
  import ResizeObserver from "$lib/components/observers/+ResizeObserver.svelte";

  export let xData: number[] = [];
  export let yData: number[] = [];
  export let height: number = 200;
  export let onInit: (event: GraphEvent) => void;
  export let flip: Writable<boolean> = writable(false);
  export let dataPoint: Writable<number> = writable(0);
  export let pointDate: Writable<number> = writable(0);
  export let positionX: Writable<number> = writable(0);
  export let positionY: Writable<number> = writable(0);
  export let prevPoint: Writable<number> = writable(0);
  export let labelActive: Writable<boolean> = writable(false);

  let graphWidth: number;

  class UIController {
    public static graph(height = 400, width = 800) {
      const graph = new Graph({
        width,
        height,
        xData,
        yData,
      });
      const xScale = graph.createScaleX<ScaleTime<number, number>>(scaleTime);
      const yScale = graph.createScaleY<ScaleLinear<number, number>>(scaleLinear);
      return { graph, xScale, yScale };
    }

    static mouseOver = (e: MouseEvent, data: number[]) => {
      const target = e.target as null | HTMLElement;
      if (target) {
        const target = e.target as HTMLElement;
        const { offsetX } = e;
        const relativeMousePosition = offsetX - graph.margin.left;
        const { width } = target.getBoundingClientRect();
        const unit = width / xData.length;
        let i = 0;
        for (i; i < xData.length - 1; i++) {
          if (relativeMousePosition >= i * unit && relativeMousePosition < (i + 1) * unit) {
            break;
          }
        }
        labelActive.set(true);
        positionX.set(e.pageX);
        positionY.set(e.pageY);
        dataPoint.set(data[i]);
        pointDate.set(xData[i]);
        flip.set(i > Math.ceil(xData.length / 2) ? true : false);
        prevPoint.update(() => {
          if (i === 0) return data[i];
          return data[i - 1];
        });
      }
    };

    static mouseOut = (_: MouseEvent) => {
      labelActive.set(false);
      positionX.set(0);
      positionY.set(0);
      dataPoint.set(0);
      pointDate.set(0);
      prevPoint.set(0);
    };
  }

  export const onMouseOut = UIController.mouseOut;
  export const onMouseOver = UIController.mouseOver;
  export let { graph, xScale, yScale } = UIController.graph();

  const onResize = (event: CustomEvent<{ height: number; width: number }>) => {
    const { height, width } = event.detail;
    ({ graph, xScale, yScale } = UIController.graph(height, width));
    onInit({ graph, xScale, yScale });
  };

  $: {
    if (xData.length && yData.length) {
      ({ graph, xScale, yScale } = UIController.graph(graph.height, graph.width));
      onInit({ graph, xScale, yScale });
    }
  }
</script>

<div class="chart-container" style="height: {height}px">
  <ResizeObserver on:resize={onResize} bind:width={graphWidth}>
    <svg width="100%" height="100%" viewBox={`0 0 ${graph.width} ${graph.height}`}>
      <Grid
        numTicks={5}
        scale={axisLeft(yScale)}
        tickSize={graph.graphWidth}
        translateX={graph.graphWidth + graph.margin.left}
      />
      <Axis
        tickSize={5}
        scale={axisBottom(xScale)}
        translateY={graph.xAxisTranslation}
        numTicks={Math.max(2, Math.floor(graph.width / 150))}
      />
      <Axis
        tickSize={5}
        scale={axisLeft(yScale)}
        translateX={graph.yAxisTranslation}
        numTicks={Math.max(2, Math.floor(graph.height / 100))}
      />
      <slot />
    </svg>
  </ResizeObserver>
</div>

<style lang="scss">
  @use "$lib/variables.scss";
  .chart-container {
    width: 100%;
    transition: height 0.5s;
    & svg {
      width: 100%;
      height: 100%;
    }
  }
</style>
