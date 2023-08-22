<script lang="ts">
  import { onMount } from "svelte";
  import moment from "moment";
  import { derived } from "svelte/store";
  import SubTile from "$lib/components/tiles/+SubTile.svelte";
  import MetricTitle from "$lib/components/data-viz/+MetricTitle.svelte";
  import { Locale } from "$lib/generics/UX/Locale";
  import { residence } from "$lib/views/residence/Stores";
  import { DateScaling } from "$lib/graphing/DateScaling";
  import { TaskQueue } from "@figliolia/task-queue";
  import { browser } from "$app/environment";

  let animate = false;

  const timeRemaining = derived(residence, v => {
    if (!v) {
      return 0;
    }
    return moment(parseInt(v?.end_date)).diff(moment());
  });

  const totalMonths = derived(residence, v => {
    if (!v) {
      return 0;
    }
    return moment(parseInt(v.end_date)).diff(moment(parseInt(v.start_date)), "months");
  });

  const label = derived(timeRemaining, v => {
    return DateScaling.unitToScale(v);
  });

  const amountRemaining = derived([residence, label], ([r, l]) => {
    if (!r) {
      return 0;
    }
    // @ts-ignore
    return Math.max(0, moment(parseInt(r?.end_date)).diff(moment(), l.toLowerCase()));
  });

  const percentageSpent = derived([residence, totalMonths], ([r, t]) => {
    if (!r) {
      return 0;
    }
    const monthsSpent = moment().diff(moment(parseInt(r.start_date)), "months");
    return (monthsSpent >= t ? 1 : monthsSpent / t) * 100;
  });

  const leasePayed = derived(residence, r => {
    if (!r) {
      return 0;
    }
    return (r.payments.reduce((acc, next) => acc + next.amount, 0) / r.amount) * 100;
  });

  onMount(() => {
    const Queue = new TaskQueue();
    if (browser) {
      Queue.deferTask(() => {
        animate = true;
      }, 1000);
    }
    return () => {
      Queue.clearDeferredTasks();
    };
  });
</script>

<SubTile title="Lease">
  <MetricTitle
    slot="title"
    label={`${$label} Remaining`}
    value={`${$amountRemaining.toLocaleString(Locale.get())}`}
  />
  <div class="content" slot="content">
    <div class="viz">
      <div class="progress">
        <div class="under" />
        <div class="over purple" style="width: {animate ? $percentageSpent : 0}%;" />
      </div>
      <div class="ticks">
        <div class="tick tick-left">0</div>
        <div class="tick tick-right">{$totalMonths}</div>
      </div>
    </div>
    <div class="viz">
      <div class="subtitle">Payments</div>
      <div class="progress">
        <div class="under" />
        <div class="over red" style="width: {animate ? $leasePayed : 0}%;" />
      </div>
      <div class="ticks">
        <div class="tick tick-left">0</div>
        <div class="tick tick-right">{($residence?.amount || 0).toLocaleString(Locale.get())}</div>
      </div>
    </div>
  </div>
</SubTile>

<style lang="scss">
  @use "$lib/variables.scss";
  .content {
    width: 100%;
  }
  .viz {
    width: 100%;
    margin-bottom: 5px;
    & > .subtitle {
      width: 100%;
      text-align: right;
      font-size: 0.75em;
      font-weight: 700;
      color: rgb(181, 178, 184);
    }
    & > .progress {
      width: 100%;
      position: relative;
      margin-top: 10px;
      & > .under {
        width: 100%;
        height: 10px;
        background-color: rgb(234, 234, 234);
        border-radius: 30px;
      }
      & > .over {
        position: absolute;
        top: 0;
        left: 0;
        height: 10px;
        transition: width 0.5s;
        border-radius: 30px;
        &.purple {
          background: linear-gradient(to right, variables.$core, variables.$core2);
        }
        &.red {
          background: linear-gradient(to right, #f28367, #ff5282);
        }
      }
    }
    & > .ticks {
      width: 100%;
      @include variables.center;
      justify-content: space-between;
      margin-top: 5px;
      & > .tick {
        font-size: 0.8em;
        color: rgb(181, 181, 181);
      }
    }
  }
</style>
