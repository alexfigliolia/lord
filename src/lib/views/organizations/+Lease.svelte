<script lang="ts">
  import moment from "moment";
  import TileContent from "$lib/components/tiles/+TileContent.svelte";
  import SectionSubTitle from "$lib/components/tiles/+SectionSubTitle.svelte";
  import Right from "$lib/icons/+Right.svelte";
  import type { Residencies_residencies } from "$lib/schema/Residencies";
  import Progress from "$lib/components/data-viz/+Progress.svelte";
  import { Locale } from "$lib/generics/UX/Locale";

  export let lease: Residencies_residencies;

  export class UIController {
    static computeProgress(lease: Residencies_residencies) {
      const start = moment(parseInt(lease.start_date));
      const end = moment(parseInt(lease.end_date));
      const now = moment();
      const totalDiff = end.diff(start);
      const currentDiff = end.diff(now);
      if (currentDiff < 0) {
        return 100;
      }
      return (currentDiff / totalDiff) * 100;
    }
  }
</script>

<a class="lease" href={`/home/residences/${lease.id}`}>
  <TileContent>
    <div class="title">
      <div class="left">
        <SectionSubTitle text={lease.property.name} />
        <div class="unit">{lease.unit.name}</div>
      </div>
      <div class="right">
        <Right color="#d0d0d0" />
      </div>
    </div>
    <div class="content">
      <div class="progress">
        <div class="p-title">Duration</div>
        <Progress
          animate
          height={7.5}
          color="linear-gradient(to right, #9e91fc, rgb(145, 189, 252))"
          progress={UIController.computeProgress(lease)}
        />
        <div class="labels">
          <div class="label label-start">
            {new Date(parseInt(lease.start_date)).toLocaleDateString(Locale.get(), {
              month: "2-digit",
              year: "numeric",
            })}
          </div>
          <div class="label label-end">
            {new Date(parseInt(lease.end_date)).toLocaleDateString(Locale.get(), {
              month: "2-digit",
              year: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  </TileContent>
</a>

<style lang="scss">
  @use "$lib/variables.scss";
  .lease {
    width: 100%;
    text-decoration: none;
    @media #{variables.$mq-670} {
      width: 49%;
    }
    @media #{variables.$mq-1350} {
      width: 32%;
    }
    &:hover .title > .right {
      opacity: 1;
      transform: translateX(0px);
    }

    & .title {
      width: 100%;
      position: relative;
      & > .left > .unit {
        color: gray;
        font-size: 0.9em;
        margin-top: 0.2em;
        font-weight: 300;
      }
      & > .right {
        position: absolute;
        top: -9px;
        right: 0px;
        height: 40px;
        width: 40px;
        opacity: 0;
        transform: translateX(-10px);
        transition-duration: 0.3s;
      }
    }
  }

  .content {
    margin-top: 10px;
    & > .progress {
      & > .p-title {
        font-size: 0.8em;
        color: rgb(170, 170, 170);
        font-weight: 700;
        margin-bottom: 5px;
      }
      & > .labels {
        width: 100%;
        @include variables.center;
        justify-content: space-between;
        margin-top: 5px;
        & > .label {
          font-size: 0.7em;
          color: rgb(119, 119, 119);
        }
      }
    }
  }
</style>
