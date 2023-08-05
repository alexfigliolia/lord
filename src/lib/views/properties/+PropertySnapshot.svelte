<script lang="ts">
  import { line } from "d3";
  import moment from "moment";
  import TileContent from "$lib/components/tiles/+TileContent.svelte";
  import AnimatedNumber from "$lib/components/data-viz/+AnimatedNumber.svelte";
  import LineGraph from "$lib/components/data-viz/+LineGraph.svelte";
  import Line from "$lib/components/data-viz/+Line.svelte";
  import type { GraphEvent } from "$lib/graphing/types";
  import type { PropertyOverview } from "$lib/types/derived";

  export let property: PropertyOverview;

  let pathData: string | undefined;

  const xData = new Array(12).fill("").map((_, i) => {
    const date = moment();
    date.subtract(12 - i, "months");
    date.hours(0);
    return date.toDate().getTime();
  });
  const yData = new Array(12).fill(0).map(() => {
    return Math.floor(Math.random() * (20000 - 10000) + 10000);
  });

  const onInit = ({ graph, xScale, yScale }: GraphEvent) => {
    pathData = line()
      .x(d => xScale(d[0]))
      .y(d => yScale(d[1]))(graph.datum) as string;
  };
</script>

<a class="property" href={`/properties/${property.id}`}>
  <TileContent>
    <div class="stats">
      <div class="title">
        <div class="name">{property.name}</div>
        <div class="place">{property.city}, {property.state}</div>
      </div>
      <div class="revenue">
        <div class="value">
          <AnimatedNumber
            active
            fontSize="25px"
            value={`$${Number(yData.reduce((acc, next) => acc + next, 0)).toLocaleString()}`}
          />
        </div>
        <div class="metric">Yearly Revenue</div>
      </div>
      <div class="content">
        <LineGraph {xData} {yData} {onInit}>
          {#if pathData}
            <Line path={pathData} strokeWidth={4} stroke="url(#lineGrad)" />
          {/if}
          <defs>
            <linearGradient id="lineGrad" x1="0" x2="0" y1="0" y2="1">
              <stop stop-color="rgb(145, 189, 252)" offset="0" />
              <stop stop-color="#9284fc" offset="1" />
            </linearGradient>
          </defs>
        </LineGraph>
      </div>
    </div>
  </TileContent>
</a>

<style lang="scss">
  @use "$lib/variables.scss";

  .property {
    width: 100%;
    margin-top: 20px;
    outline: none;
    border: none;
    padding: 0;
    @media #{variables.$mq-670} {
      width: 49%;
    }
    @media #{variables.$mq-1350} {
      width: 32%;
    }
  }
  .stats {
    width: 100%;
    position: relative;
    & > .title {
      position: absolute;
      top: 0;
      left: 4px;
      text-align: left;
      & > .name {
        font-size: 1.25em;
        color: rgb(116, 107, 127);
        font-weight: 700;
        margin-bottom: 2.5px;
      }
      & > .place {
        font-size: 0.75em;
        font-weight: 700;
        color: rgb(181, 178, 184);
      }
    }
    & > .revenue {
      top: 0;
      right: 4px;
      position: absolute;
      & > .metric {
        width: 100%;
        text-align: right;
        font-size: 0.75em;
        font-weight: 700;
        color: rgb(181, 178, 184);
      }
      & > .value {
        font-weight: 300;
        color: variables.$core;
        letter-spacing: -0.05px;
        text-shadow: 0px 0.25px 0.5px rgba(0, 0, 0, 0.2);
      }
    }
    & > .content {
      width: 100%;
      padding-top: 60px;
    }
  }
</style>
