<script lang="ts">
  import DisplayTile from "$lib/components/tiles/+DisplayTile.svelte";
  import PercentageFill from "$lib/components/data-viz/+PercentageFill.svelte";
  import LinearGradient from "$lib/components/+LinearGradient.svelte";
</script>

<DisplayTile title="Occupancy" subtitle="All Properties">
  <div class="position">
    <PercentageFill
      fontSize="70px"
      percentage={0.85}
      stroke="url(#vGrad)"
      textStyle="color: #9e91fc; font-weight: 300;"
    >
      <LinearGradient id="vGrad" />
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
