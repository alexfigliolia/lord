<script lang="ts">
  import { line } from "d3";
  import TileContent from "$lib/components/tiles/+TileContent.svelte";
  import AnimatedNumber from "$lib/components/data-viz/+AnimatedNumber.svelte";
  import LineGraph from "$lib/components/data-viz/+LineGraph.svelte";
  import Line from "$lib/components/data-viz/+Line.svelte";
  import type { GraphEvent } from "$lib/graphing/types";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { DateScaling } from "$lib/graphing/DateScaling";
  import { DataPointAggregator } from "../property/DataPointAggregator";
  import LinearGradient from "$lib/components/gradients/+LinearGradient.svelte";
  import type { OrganizationByID_organization_properties } from "$lib/schema/OrganizationByID";

  export let property: OrganizationByID_organization_properties;

  let pathname: string = "";
  let pathData: string | undefined;

  const paymentMap = new DataPointAggregator(property.payments);
  const xData = DateScaling.last12Months();
  const yData = xData.map(d => {
    const month = new Date(d).getMonth();
    // @ts-ignore
    return paymentMap.table[month];
  });

  const onInit = ({ graph, xScale, yScale }: GraphEvent) => {
    pathData = line()
      .x(d => xScale(d[0]))
      .y(d => yScale(d[1]))(graph.datum) as string;
  };

  onMount(() => {
    if (browser) {
      ({ pathname } = window.location);
    }
  });
</script>

<a class="property" href={`${pathname}/${property.id}`}>
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
            <Line
              path={pathData}
              strokeWidth={4}
              stroke={yData.every(d => d === yData[0]) ? "#9284fc" : "url(#lineGrad)"}
            />
          {/if}
          <LinearGradient id="lineGrad" color1="rgb(145, 189, 252)" color2="#9284fc" />
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
