<script lang="ts">
  import PieChart from "$lib/components/data-viz/+PieChart.svelte";
  import { activeProperty } from "$lib/state/Properties";
  import { derived } from "svelte/store";
  import LinearGradient from "$lib/components/+LinearGradient.svelte";
  import { Issues } from "$lib/views/overview/Issues/Issues";
  import PieSection from "$lib/components/data-viz/+PieSection.svelte";
  import type { PieGraph } from "$lib/graphing/PieGraph";

  let graph: PieGraph;
  let paths: string[] = [];
  let active = false;

  const data = derived(activeProperty, v => {
    const hash: Record<string, number> = {};
    for (const issue of v.issues) {
      hash[issue.status] = (hash[issue.status] || 0) + 1;
    }
    return Object.keys(hash).map(key => ({ label: key, value: hash[key] }));
  });

  $: if (graph && $data.length) {
    // @ts-ignore
    paths = graph.Pie($data).map(angle => graph.Arc(angle));
    setTimeout(() => {
      active = true;
    }, 1);
  }
</script>

<div class="chart">
  <div class="pie">
    <PieChart bind:graph data={$data} style="filter: drop-shadow(0px 2.5px 5px rgba(0,0,0,0.2));">
      <svelte:fragment slot="svg">
        <LinearGradient id="inProgressGrad" color1="#04c340" color2="rgb(2, 215, 115)" />
        <LinearGradient id="openGrad" color1="#ff007b" color2="#fe0f33" />
        <LinearGradient id="completeGrad" color1="#00d9ff" color2="#00a6ff" />
      </svelte:fragment>
      <svelte:fragment slot="sections">
        {#if paths.length}
          {#each $data as { value, label }, index}
            <PieSection
              {value}
              path={paths[index]}
              delay={index * 300}
              title={Issues.getDisplay(label)}
              fill={Issues.getGradient(label)}
            />
          {/each}
        {/if}
      </svelte:fragment>
    </PieChart>
  </div>
  <div class="key" class:active>
    {#each $data as { label, value }}
      <div>
        <div class="label">
          <div class={`block ${label}`} />
          <div class="label-text">{Issues.getDisplay(label)}</div>
        </div>
        <div class="value">{value}</div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .chart {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    & .pie {
      max-width: 50%;
      height: 200px;
      padding-bottom: 10px;
      box-sizing: border-box;
      margin-right: 40px;
      display: block;
    }
    & .key {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-bottom: 20px;
      opacity: 0;
      transition-delay: 1.5s;
      transition-duration: 0.5s;
      &.active {
        opacity: 1;
      }
      & > div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        & > .label {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          margin-right: 20px;
          & > .block {
            height: 30px;
            width: 30px;
            margin-right: 10px;
            box-shadow: 0px 1px 2.5px rgba(#000, 0.2);
            border-radius: 50%;
            &.inprogress {
              background: linear-gradient(to right, #04c340, rgb(2, 215, 115));
            }
            &.complete {
              background: linear-gradient(to right, #00d9ff, #00a6ff);
            }
            &.open {
              background: linear-gradient(to right, #ff007b, #fe0f33);
            }
          }
          & > .label-text {
            color: #565656;
            font-weight: 300;
          }
        }
        & > .value {
          color: #565656;
          font-weight: 300;
        }
      }
    }
  }
</style>
