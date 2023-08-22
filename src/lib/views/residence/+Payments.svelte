<script lang="ts">
  import { onMount } from "svelte";
  import { derived } from "svelte/store";
  import { browser } from "$app/environment";
  import Circle from "$lib/components/data-viz/+Circle.svelte";
  import LinearGradient from "$lib/components/gradients/+LinearGradient.svelte";
  import { Payments } from "./Payments";
  import SubTile from "$lib/components/tiles/+SubTile.svelte";
  import MetricTitle from "$lib/components/data-viz/+MetricTitle.svelte";
  import { Locale } from "$lib/generics/UX/Locale";
  import { residence } from "$lib/views/residence/Stores";
  import { addModalOpen, tab } from "$lib/state/Add";
  import moment from "moment";
  import DownwardGradient from "$lib/components/gradients/+DownwardGradient.svelte";

  let animate = false;

  const status = derived(residence, v => {
    return Payments.owed(v);
  });

  const percentage = derived(status, v => {
    return v.amountPayed / v.amountOwed;
  });

  const amountDue = derived(status, v => {
    return v.amountOwed - v.amountPayed;
  });

  const totalTime = derived(residence, v => {
    if (!v) {
      return 0;
    }
    return moment(parseInt(v.end_date)).diff(moment(parseInt(v.start_date)));
  });

  const timeSpent = derived([residence, totalTime], ([r, t]) => {
    if (!r) {
      return 0;
    }
    const timeSpent = moment().diff(moment(parseInt(r.start_date)));
    return Math.min(timeSpent, t);
  });

  const leaseProgress = derived([totalTime, timeSpent], ([t, s]) => {
    return s / t;
  });

  const makePayment = () => {
    addModalOpen.set(true);
    tab.set(0);
  };

  const stroke = derived(percentage, v => {
    if (v > 0.66) {
      return "url(#payGrad1)";
    }
    if (v > 0.33) {
      return "url(#payGrad2)";
    }
    return "url(#payGrad3)";
  });

  const textColor = derived(percentage, v => {
    if (v > 0.66) {
      return "#9284fc";
    }
    if (v > 0.33) {
      return "rgb(255, 174, 25)";
    }
    return "rgb(255, 25, 25)";
  });

  onMount(() => {
    if (browser) {
      setTimeout(() => {
        animate = true;
      }, 1000);
    }
  });
</script>

<SubTile title="Payments">
  <MetricTitle
    slot="title"
    label="Completed Payments"
    value={`${($percentage * 100).toFixed(0)}%`}
    style="color: {$textColor};"
  />
  <div class="content" slot="content">
    <div class="graph">
      <div class="prog">
        <Circle
          strokeWidth={35}
          fill="transparent"
          animate={animate ? $percentage : 0}
          progress={animate ? $percentage : 0}
          stroke={animate ? $stroke : "transparent"}
        >
          <LinearGradient id="payGrad1" />
          <LinearGradient id="payGrad2" color1="rgb(255, 242, 0)" color2="rgb(255, 174, 25)" />
          <LinearGradient id="payGrad3" color1="rgb(255, 25, 25)" color2="rgb(255, 37, 99)" />
        </Circle>
      </div>
      <div class="prog inner">
        <Circle
          strokeWidth={35}
          fill="transparent"
          animate={animate ? $leaseProgress : 0}
          progress={animate ? $leaseProgress : 0}
          stroke={animate ? "url(#progress)" : "transparent"}
        >
          <DownwardGradient id="progress" color1="#f28367" color2="#ff5282" />
        </Circle>
      </div>
      <Circle fill="transparent" stroke="rgb(237, 237, 237)" strokeWidth={25} />
    </div>
    <div class="stats">
      <div class="owed">
        <strong>Amount Payed: </strong>
        {$status.amountPayed.toLocaleString(Locale.get())}
      </div>
      <div class="owed" class:red={$amountDue > 0}>
        <strong>Amount Due: </strong>
        {$amountDue.toLocaleString(Locale.get())}
      </div>
      {#if $amountDue > 0}
        <button on:click={makePayment}>Make Payment</button>
      {/if}
    </div>
  </div>
</SubTile>

<style lang="scss">
  @use "$lib/variables.scss";
  .content {
    width: 100%;
    @include variables.center;
    & > .graph {
      position: relative;
      max-width: 150px;
      & > .prog {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        &.inner {
          width: calc(100% - 20px);
          height: calc(100% - 20px);
          top: 10px;
          left: 10px;
        }
      }
    }
    & > .stats {
      margin-left: 3%;
      width: 100%;
      min-width: 200px;
      max-width: 250px;
      & > .owed {
        color: rgb(128, 128, 128);
        display: flex;
        justify-content: space-between;
        &.red {
          color: #ea4d4d;
          font-weight: 600;
        }
        &:not(:last-of-type) {
          margin-bottom: 0.35em;
        }
        & > strong {
          font-weight: 700;
          color: rgb(113 104 125);
        }
      }
      & > button {
        border: none;
        padding: 0;
        outline: none;
        background-color: transparent;
        font-style: italic;
        color: rgb(137, 137, 137);
        font-size: 0.85em;
        margin-top: 10px;
        transition-duration: 0.3s;
        &:hover {
          color: rgb(89, 89, 89);
        }
      }
    }
  }
</style>
