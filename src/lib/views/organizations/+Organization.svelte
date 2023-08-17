<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import Gauge from "$lib/components/data-viz/+Gauge.svelte";
  import TileContent from "$lib/components/tiles/+TileContent.svelte";
  import SectionSubTitle from "$lib/components/tiles/+SectionSubTitle.svelte";
  import LinearGradient from "$lib/components/gradients/+LinearGradient.svelte";
  import DownwardGradient from "$lib/components/gradients/+DownwardGradient.svelte";
  import { totalUsers, totalProperties, totalIssues } from "$lib/state/Organization";
  import AnimatedNumber from "$lib/components/data-viz/+AnimatedNumber.svelte";
  import type { ResizeObserverEvent } from "$lib/components/observers/types";
  import Right from "$lib/icons/+Right.svelte";
  import type { OrganizationsByAffiliation_organizationStats } from "$lib/schema/OrganizationsByAffiliation";

  export let organization: OrganizationsByAffiliation_organizationStats;

  let fillGauges = false;
  let fontSize = "45px";

  class UIController {
    public static dodgeNaNs(value: number, total: number) {
      if (value === 0 && total === 0) {
        return 1;
      }
      return value / total;
    }

    public static computePercentage(type: "properties" | "issues" | "users") {
      switch (type) {
        case "properties":
          return Math.round(this.dodgeNaNs(organization._count.properties, $totalProperties) * 100);
        case "issues":
          return Math.round(this.dodgeNaNs(organization._count.issues, $totalIssues) * 100);
        case "users":
          return Math.round(this.dodgeNaNs(organization._count.users, $totalUsers) * 100);
        default:
          return 0;
      }
    }

    public static onResize = (e: ResizeObserverEvent) => {
      fontSize = `${e.detail.width / 3}px`;
    };
  }

  onMount(() => {
    if (browser) {
      setTimeout(() => {
        fillGauges = true;
      }, 500);
    }
  });
</script>

<a class="org" href={`/teams/${organization.id}`}>
  <TileContent>
    <div class="title">
      <SectionSubTitle text={organization.name} />
      <div class="right">
        <Right color="#d0d0d0" />
      </div>
    </div>
    <div class="gauges">
      <div class="gauge">
        <div class="svg">
          <Gauge
            stroke="url(#propGrad)"
            onResize={UIController.onResize}
            percentage={fillGauges ? UIController.computePercentage("properties") : 0}
          >
            <LinearGradient id="propGrad" />
          </Gauge>
          <div class="number">
            <AnimatedNumber
              active
              {fontSize}
              duration={2}
              style="color: #9e91fc; font-weight: 200;"
              value={organization._count.properties}
            />
          </div>
        </div>
        <div class="label">Properties</div>
      </div>
      <div class="gauge">
        <div class="svg">
          <Gauge
            stroke="url(#userGrad)"
            style="filter: drop-shadow(0px 3px 1px rgba(0,0,0,0.05))"
            percentage={fillGauges ? UIController.computePercentage("users") : 0}
          >
            <LinearGradient id="userGrad" color2="rgb(57, 220, 168)" color1="rgb(78, 215, 215)" />
          </Gauge>
          <div class="number">
            <AnimatedNumber
              active
              {fontSize}
              duration={2}
              style="color: rgb(78, 215, 215); font-weight: 200;"
              value={organization._count.users}
            />
          </div>
        </div>
        <div class="label">Team Members</div>
      </div>
      <div class="gauge">
        <div class="svg">
          <Gauge
            stroke="url(#issueGrad)"
            style="filter: drop-shadow(0px 3px 1px rgba(0,0,0,0.05))"
            percentage={fillGauges ? UIController.computePercentage("issues") : 0}
          >
            <DownwardGradient id="issueGrad" color2="rgb(255, 167, 73)" color1="rgb(255, 49, 97)" />
          </Gauge>
          <div class="number">
            <AnimatedNumber
              active
              {fontSize}
              duration={2}
              style="color: rgb(255, 49, 97); font-weight: 200;"
              value={organization._count.issues}
            />
          </div>
        </div>
        <div class="label">Open Issues</div>
      </div>
    </div>
  </TileContent>
</a>

<style lang="scss">
  @use "$lib/variables.scss";
  .org {
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

  .gauges {
    margin-top: 10px;
    @include variables.center;
    gap: 0% 5%;
    @media #{variables.$mq-670} {
      gap: 0% 2.5%;
    }
    & > .gauge {
      width: 33.3333%;
      max-width: 200px;
      & > .svg {
        height: 150px;
        position: relative;
        & > .number {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          @include variables.center;
        }
      }
      & > .label {
        width: 100%;
        text-align: center;
        font-size: 100%;
        color: rgb(167, 167, 167);
        margin-top: -15px;
        @media #{variables.$mq-670} {
          font-size: 0.75em;
          margin-top: -25px;
        }
        @media #{variables.$mq-800} {
          font-size: 0.9em;
          margin-top: -15px;
        }
        @media #{variables.$mq-1200} {
          font-size: 1em;
          margin-top: -15px;
        }
        @media #{variables.$mq-1350} {
          font-size: 0.8em;
          margin-top: -25px;
        }
        @media #{variables.$mq-1450} {
          font-size: 0.9em;
          margin-top: -20px;
        }
      }
    }
  }
</style>
