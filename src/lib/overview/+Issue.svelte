<script lang="ts">
  import TileListItem from "$lib/components/+TileListItem.svelte";
  import Hammer from "$lib/icons/+Hammer.svelte";
  import ClipBoard from "$lib/icons/+ClipBoard.svelte";
  import People from "$lib/icons/+People.svelte";

  export let title: string;
  export let description: string;
  export let createdBy: string;
  export let type: keyof typeof Issues.types;
  export let status: keyof typeof Issues.statuses;

  export class Issues {
    public static statuses = {
      complete: "grey",
      open: "red",
      inprogress: "green",
    };

    public static statusDisplay = {
      complete: "complete",
      open: "open",
      inprogress: "in progress",
    };

    public static types = {
      fix: 1,
      complaint: 1,
      consultation: 1,
    };
  }
</script>

<TileListItem margin={20}>
  <div class="position">
    <div class="left">
      <div class="icon">
        <div>
          {#if type === "complaint"}
            <People color="#fff" />
          {/if}
          {#if type === "consultation"}
            <ClipBoard color="#fff" />
          {/if}
          {#if type === "fix"}
            <Hammer color="#fff" />
          {/if}
        </div>
      </div>
      <div class="meta">
        <h3>{title}</h3>
        <p class="author">{createdBy}</p>
        <p class="description">{description}</p>
      </div>
    </div>
    <div class="assignment">
      <div class={`status ${Issues.statuses[status]}`}>{Issues.statusDisplay[status]}</div>
    </div>
  </div></TileListItem
>

<style lang="scss">
  @use "$lib/variables";
  .position {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    @media #{variables.$mq-670} {
      padding: 0;
    }
    & > .left {
      display: flex;
      flex-direction: row;
      align-items: center;
      & > .icon {
        height: 50px;
        width: 50px;
        min-width: 50px;
        min-height: 50px;
        border-radius: 50%;
        background-color: variables.$core;
        @include variables.center;
        box-shadow: 0px 2.5px 5px rgba(#000, 0.2);
        & > div {
          height: 30px;
          width: 30px;
        }
      }
      & > .meta {
        display: flex;
        flex-direction: column;
        margin-left: 1em;
        margin-right: 1em;
        & > h3 {
          margin: 0;
          font-size: 1em;
          color: variables.$darkgrey;
          font-weight: 500;
        }
        & > p {
          margin: 0;
        }
        & > .author {
          color: variables.$grey;
          font-size: 0.75em;
          font-weight: 700;
          margin-top: 5px;
        }
        & > .description {
          margin: 0;
          color: variables.$grey;
          font-weight: 400;
          margin-top: 10px;
        }
      }
    }
    & > .assignment {
      align-self: center;
      .status {
        padding: 10px 20px;
        border-radius: 5px;
        @include variables.center;
        text-transform: uppercase;
        font-size: 0.75em;
        font-weight: 700;
        text-wrap: nowrap;
        &.green {
          background-color: rgb(143, 227, 143);
          color: rgb(20, 166, 69);
        }
        &.red {
          background-color: rgb(255, 172, 172);
          color: rgb(224, 63, 63);
        }
        &.grey {
          background-color: rgb(220, 220, 220);
          color: rgb(173, 173, 173);
        }
      }
    }
  }
</style>
