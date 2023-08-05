<script lang="ts">
  import SectionSubTitle from "./+SectionSubTitle.svelte";
  import TileContent from "./+TileContent.svelte";

  export let title: string;
</script>

<TileContent>
  <div class="title">
    <SectionSubTitle text={title} />
    <slot name="title" />
  </div>
  <div class="content">
    <slot name="content" />
  </div>
</TileContent>

<style lang="scss">
  .title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 5px;
  }
  .content {
    width: 100%;
  }
</style>
