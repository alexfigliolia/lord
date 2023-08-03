<script lang="ts">
  import SectionTitle from "$lib/components/tiles/+SectionTitle.svelte";
  import TileListItem from "$lib/components/tiles/+TileListItem.svelte";
  import Check from "$lib/icons/+Check.svelte";
  import Issue from "./+Issue.svelte";
  import { issues } from "$lib/state/Issues";
  import { addModalOpen, tab } from "$lib/state/Add";

  let hovered: boolean = false;

  class UIController {
    public static onMouseEnter = () => {
      hovered = true;
    };
    public static onMouseLeave = () => {
      hovered = false;
    };

    public static openAdd = () => {
      addModalOpen.set(true);
      tab.set(2);
    };
  }
</script>

<div class="container">
  <SectionTitle text="All Issues" />
  {#each $issues as { id, type, title, description, status, assigned, created_at, author }, index}
    <Issue
      {id}
      {type}
      {index}
      {title}
      {status}
      {description}
      date={created_at}
      createdBy={author}
      {assigned}
      margin={index === $issues.length - 1 ? 0 : 20}
    />
  {/each}
  {#if !$issues.length}
    <TileListItem margin={0}>
      <button
        on:click={UIController.openAdd}
        on:mouseenter={UIController.onMouseEnter}
        on:mouseleave={UIController.onMouseLeave}
        class="position"
        slot="content"
      >
        <div class="check">
          <Check color={hovered ? "#9e91fc" : "#b5b5b5"} />
        </div>
        Create your first issue
      </button>
    </TileListItem>
  {/if}
</div>

<style lang="scss">
  @use "$lib/variables.scss";
  .container {
    width: 100%;
  }

  .position {
    @include variables.center;
    font-size: 1.1em;
    padding: 5px 0;
    font-style: italic;
    color: #b5b5b5;
    outline: none;
    border: none;
    background-color: transparent;
    width: 100%;
    transition-duration: 0.3s;
    & > .check {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 2px solid #b5b5b5;
      margin-right: 10px;
      transition-duration: 0.3s;
    }
    &:hover {
      color: variables.$core;
      & > .check {
        border: 2px solid variables.$core;
      }
    }
  }
</style>
