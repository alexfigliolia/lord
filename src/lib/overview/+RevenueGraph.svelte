<script lang="ts">
  import DisplayTile from "$lib/components/+DisplayTile.svelte";
  import NumericStatus from "$lib/components/+NumericStatus.svelte";
  import Axis from "$lib/graphing/+Axis.svelte";
  import Grid from "$lib/graphing/+Grid.svelte";
  import Path from "$lib/graphing/+Path.svelte";
  import { DateScaling } from "$lib/graphing/DateScaling";
  import { Graph } from "$lib/graphing/Graph";
  import { area, extent, max, scaleLinear, scaleTime } from "d3";
  import {
    flip,
    dataPoint,
    labelActive,
    pointDate,
    positionX,
    positionY,
    prevPoint,
  } from "./Store";

  const dates = new Array(12).fill("").map((_, i) => {
    const date = new Date();
    date.setMonth(i);
    date.setFullYear(2023);
    return date.getTime();
  });
  const data = dates.map(d => ({
    x: d,
    y: Math.floor(Math.random() * (20000 - 10000) + 10000),
  }));

  const [minX, maxX] = extent(data, d => d.x) as [number, number];
  const [_, maxY] = extent(data, d => d.y) as [number, number];

  const graph = new Graph({
    data: data,
    width: 800,
    height: 350,
  });

  const xScale = scaleTime([minX, maxX], [graph.margin.left, graph.width - graph.margin.right]);

  const yScale = scaleLinear(
    [0, max(data, d => d.y) as number],
    [graph.height - graph.margin.bottom, graph.margin.top],
  );

  const Area = area()
    // @ts-ignore
    .x(d => xScale(d.x))
    .y0(yScale(0))
    // @ts-ignore
    .y1(d => yScale(d.y)) as unknown as string;

  const mouseOver = (e: MouseEvent) => {
    const target = e.target as null | HTMLElement;
    if (target) {
      const offsetX = e.offsetX - 50;
      const { width } = target.getBoundingClientRect();
      const unit = width / data.length;
      let i = 0;
      for (i; i < data.length - 1; i++) {
        if (offsetX >= i * unit && offsetX < (i + 1) * unit) {
          break;
        }
      }
      labelActive.update(() => true);
      positionX.update(() => e.pageX);
      positionY.update(() => e.pageY);
      dataPoint.update(() => data[i].y);
      pointDate.update(() => data[i].x);
      flip.update(() => (i > Math.ceil(data.length / 2) ? true : false));
      prevPoint.update(() => {
        if (i === 0) return 0;
        return data[i - 1].y;
      });
    }
  };

  const mouseOut = (_: MouseEvent) => {
    labelActive.update(() => false);
    positionX.update(() => 0);
    positionY.update(() => 0);
    dataPoint.update(() => 0);
    pointDate.update(() => 0);
    prevPoint.update(() => 0);
  };
</script>

<DisplayTile title="Revenue" subtitle="All Properties">
  <div class="mom">
    <NumericStatus
      positive
      change="3.34%"
      title="Current Month"
      value={`$${Number(data[3].y).toLocaleString()}`}
    />
  </div>
  <div class="chart-container">
    <div class="tick y-top">{`$${Number(maxY).toLocaleString()}`}</div>
    <div class="tick y-bottom">0</div>
    <div class="tick x-left">{DateScaling.months[new Date(minX).getMonth()]}</div>
    <div class="tick x-right">{DateScaling.months[new Date(maxX).getMonth()]}</div>
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${graph.width} ${graph.height}`}
      preserveAspectRatio="none"
    >
      <linearGradient id="graphGrad" x1="0" x2="0" y1="0" y2="1">
        <stop stop-color="#9284fc" offset="0" />
        <stop stop-color="rgb(145, 189, 252)" offset="1" />
      </linearGradient>
      <Grid
        scale={yScale}
        direction="left"
        numTicks={5}
        color="lightgrey"
        size={graph.graphWidth}
        translateX={graph.graphWidth + graph.margin.left}
      />
      <Axis scale={xScale} direction="bottom" numTicks={0} translateY={graph.xAxisTranslation} />
      <Axis scale={yScale} direction="left" numTicks={0} translateX={graph.yAxisTranslation} />
      <Path
        path={Area}
        {data}
        stroke="transparent"
        fill="url(#graphGrad)"
        onMouseOut={mouseOut}
        onMouseOver={mouseOver}
      />
    </svg>
  </div>
</DisplayTile>

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
    height: 200px;
    margin-top: 40px;
    position: relative;
    @media #{variables.$mq-670} {
      height: 300px;
    }
    & > svg {
      width: 100%;
      height: 100%;
    }
    .tick {
      color: rgb(177, 154, 206);
      font-size: 0.5em;
      font-weight: 100;
      @media #{variables.$mq-670} {
        font-size: 1em;
      }
      @media #{variables.$mq-1200} {
        font-size: 1.25em;
      }
      &.y-top {
        position: absolute;
        top: -1em;
        left: 0;
      }
      &.y-bottom {
        position: absolute;
        bottom: 2em;
        left: 1em;
        @media #{variables.$mq-670} {
          bottom: 1.5em;
          left: 0.5em;
        }
        @media #{variables.$mq-1200} {
          bottom: 1.25em;
          left: 1em;
        }
      }
      &.x-left {
        position: absolute;
        bottom: 0;
        left: 3%;
      }
      &.x-right {
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
  }
</style>
