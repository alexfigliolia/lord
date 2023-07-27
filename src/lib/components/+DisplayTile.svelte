<script lang="ts">
  import SectionSubTitle from "./+SectionSubTitle.svelte";
  import TileFull from "./+TileFull.svelte";

  export let title: string;
  export let subtitle: string;
</script>

<TileFull {title}>
  <SectionSubTitle text={subtitle} />
  <slot />
</TileFull>
