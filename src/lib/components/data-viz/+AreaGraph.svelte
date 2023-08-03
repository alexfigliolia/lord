<script lang="ts">
  import NumericStatus from "$lib/components/data-viz/+NumericStatus.svelte";
  import Axis from "$lib/graphing/+Axis.svelte";
  import Grid from "$lib/graphing/+Grid.svelte";
  import Area from "$lib/graphing/+Area.svelte";
  import { Graph } from "$lib/graphing/Graph";
  import {
    area,
    axisLeft,
    scaleTime,
    axisBottom,
    scaleLinear,
    type ScaleLinear,
    type ScaleTime,
  } from "d3";
  import type { Writable } from "svelte/store";
  import ResizeObserver from "$lib/components/observers/+ResizeObserver.svelte";

  export let xData: number[];
  export let yData: number[];
  export let flip: Writable<boolean>;
  export let dataPoint: Writable<number>;
  export let pointDate: Writable<number>;
  export let positionX: Writable<number>;
  export let positionY: Writable<number>;
  export let prevPoint: Writable<number>;
  export let labelActive: Writable<boolean>;

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
      const PathData = area()
        .x(d => xScale(d[0]))
        .y0(yScale(0))
        .y1(d => yScale(d[1]))(graph.datum) as string;

      return { graph, PathData, xScale, yScale };
    }

    static mouseOver = (e: MouseEvent) => {
      const target = e.target as null | HTMLElement;
      if (target) {
        const { x, y, index } = graph.deriveFromMousePosition(e);
        labelActive.set(true);
        positionX.set(e.pageX);
        positionY.set(e.pageY);
        dataPoint.set(y);
        pointDate.set(x);
        flip.set(index > Math.ceil(graph.xData.length / 2) ? true : false);
        prevPoint.update(() => {
          if (index === 0) y;
          return graph.yData[index - 1];
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

  let { graph, PathData, xScale, yScale } = UIController.graph();

  const onResize = (event: CustomEvent<{ height: number; width: number }>) => {
    const { height, width } = event.detail;
    ({ graph, PathData, xScale, yScale } = UIController.graph(height, width));
  };
</script>

<div class="mom">
  <NumericStatus
    positive
    change="3.34%"
    title="Current Month"
    value={`$${Number(graph.yData[graph.yData.length - 1]).toLocaleString()}`}
  />
</div>
<div class="chart-container">
  <ResizeObserver on:resize={onResize}>
    <svg width="100%" height="100%" viewBox={`0 0 ${graph.width} ${graph.height}`}>
      <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
        <stop stop-color="#9284fc" offset="0" />
        <stop stop-color="rgb(145, 189, 252)" offset="1" />
      </linearGradient>
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
        numTicks={Math.floor(graph.width / 150)}
      />
      <Axis
        tickSize={5}
        scale={axisLeft(yScale)}
        translateX={graph.yAxisTranslation}
        numTicks={Math.floor(graph.height / 100)}
      />
      <Area
        path={PathData}
        stroke="transparent"
        fill="url(#areaGrad)"
        onMouseOut={UIController.mouseOut}
        onMouseOver={UIController.mouseOver}
      />
    </svg>
  </ResizeObserver>
</div>

<style lang="scss">
  @use "$lib/variables.scss";
  .mom {
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 2;
    box-shadow: 0px 5px 10px rgba(#000, 0.2);
    border-radius: 10px;
  }
  .chart-container {
    width: 100%;
    height: auto;
    height: 225px;
    margin-top: 30px;
    position: relative;
    @media #{variables.$mq-670} {
      height: 300px;
    }
    & svg {
      width: 100%;
      height: 100%;
    }
  }
</style>
