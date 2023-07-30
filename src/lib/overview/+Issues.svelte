<script lang="ts">
  import SectionTitle from "$lib/components/+SectionTitle.svelte";
  import Issue from "./+Issue.svelte";
</script>

<div class="container">
  <SectionTitle text="All Issues" />
  <Issue
    type="fix"
    title="broken toilet"
    description="My toilet won't flush"
    status="open"
    createdBy="Alex Figliolia"
  />
  <Issue
    type="consultation"
    title="broken toilet"
    description="My toilet won't flush"
    status="complete"
    createdBy="Alex Figliolia"
  />
  <Issue
    type="complaint"
    title="broken toilet"
    description="My toilet won't flush"
    status="inprogress"
    createdBy="Alex Figliolia"
  />
  <Issue
    type="fix"
    title="broken toilet"
    description="My toilet won't flush"
    status="open"
    createdBy="Alex Figliolia"
  />
  <Issue
    margin={0}
    type="complaint"
    title="broken toilet"
    description="My toilet won't flush"
    status="complete"
    createdBy="Alex Figliolia"
  />
</div>

<style lang="scss">
  @use "$lib/variables.scss";
  .container {
    width: 100%;
  }
</style>
