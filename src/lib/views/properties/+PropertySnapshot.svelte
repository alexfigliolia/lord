<script lang="ts">
  import moment from "moment";
  import TileContent from "$lib/components/tiles/+TileContent.svelte";
  import { derived } from "svelte/store";
  import { propertiesHash } from "$lib/state/Properties";
  import AnimatedNumber from "$lib/components/data-viz/+AnimatedNumber.svelte";
  import LineGraph from "$lib/components/data-viz/+LineGraph.svelte";

  export let id: number;

  const property = derived(propertiesHash, v => v[id]);

  const xData = new Array(12).fill("").map((_, i) => {
    const date = moment();
    date.subtract(12 - i, "months");
    date.hours(0);
    return date.toDate().getTime();
  });
  const yData = new Array(12).fill(0).map(() => {
    return Math.floor(Math.random() * (20000 - 10000) + 10000);
  });
</script>

<a class="property" href={`/app/properties/${$property.id}`}>
  <TileContent>
    <div class="stats">
      <div class="title">
        <div class="name">{$property.name}</div>
        <div class="place">{$property.city}, {$property.state}</div>
      </div>
      <div class="revenue">
        <div class="value">
          <AnimatedNumber active value="$12,345" fontSize="25px" />
        </div>
        <div class="metric">Yearly</div>
      </div>
      <div class="content">
        <LineGraph {xData} {yData} />
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
      padding-top: 40px;
    }
  }
</style>
