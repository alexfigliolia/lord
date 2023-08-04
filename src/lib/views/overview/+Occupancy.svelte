<script lang="ts">
  import DisplayTile from "$lib/components/tiles/+DisplayTile.svelte";
  import PercentageFill from "$lib/components/data-viz/+PercentageFill.svelte";
</script>

<DisplayTile title="Occupancy" subtitle="All Properties">
  <div class="position">
    <PercentageFill
      fontSize="70px"
      percentage={0.85}
      stroke="url(#vGrad)"
      textStyle="color: #9e91fc; font-weight: 300;"
    >
      <defs>
        <linearGradient id="vGrad" x1="0" x2="1" y1="0" y2="0">
          <stop stop-color="#9284fc" offset="0" />
          <stop stop-color="rgb(145, 189, 252)" offset="1" />
        </linearGradient>
      </defs>
    </PercentageFill>
  </div>
</DisplayTile>

<style lang="scss">
  @use "$lib/variables.scss";
  .position {
    width: 100%;
    @include variables.center;
    padding: 20px;
    box-sizing: border-box;
    @media #{variables.$mq-1350} {
      padding: 0;
    }
  }
</style>
