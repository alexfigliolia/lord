<script lang="ts">
  export let margin: number = 0;
</script>

<div class="content" style="margin-top: {margin}px;">
  <div>
    <slot />
  </div>
</div>

<style lang="scss">
  @use "$lib/variables.scss";
  .content {
    box-sizing: border-box;
    width: 100%;
    height: auto;
    padding: 4vw;
    min-height: 40px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0px 5px 15px rgba(#000, 0.2);
    @media #{variables.$mq-550} {
      padding: 2vw;
    }
    @media #{variables.$mq-1200} {
      padding: 1.5vw;
    }
    @media #{variables.$mq-1350} {
      padding: 1.15vw;
    }
    & > div {
      width: 100%;
      height: 100%;
    }
  }
</style>
