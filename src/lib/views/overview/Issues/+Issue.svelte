<script lang="ts">
  import TileListItem from "$lib/components/tiles/+TileListItem.svelte";
  import Hammer from "$lib/icons/+Hammer.svelte";
  import ClipBoard from "$lib/icons/+ClipBoard.svelte";
  import People from "$lib/icons/+People.svelte";
  import { Locale } from "$lib/generics/UX/Locale";
  import { IssueType } from "$lib/types";
  import type { Issue } from "$lib/types/derived";
  import IssueStatus from "./+IssueStatus.svelte";
  import IssueAssignment from "./+IssueAssignment.svelte";

  export let issue: Issue;
  export let index: number;
  export let margin: number = 20;
</script>

<TileListItem {margin}>
  <div class="position" slot="content">
    <div class="left">
      <div class="icon">
        <div>
          {#if issue.type === IssueType.Complaint}
            <People color="#fff" />
          {/if}
          {#if issue.type === IssueType.Consultation}
            <ClipBoard color="#fff" />
          {/if}
          {#if issue.type === IssueType.Fix}
            <Hammer color="#fff" />
          {/if}
        </div>
      </div>
      <div class="meta">
        <h3>{issue}</h3>
        <p class="author">
          {issue.author} on
          {new Date(parseInt(issue.created_at)).toLocaleDateString(Locale.get(), {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p class="description">{issue.description}</p>
      </div>
    </div>
    <IssueStatus id={issue.id} {index} status={issue.status} />
  </div>
  <IssueAssignment slot="actions" id={issue.id} {index} assigned={issue.assigned} />
</TileListItem>

<style lang="scss">
  @use "$lib/variables";
  .position {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    font-size: 0.9em;
    min-height: 90px;
    @media #{variables.$mq-670} {
      padding: 0;
      font-size: 1em;
    }
    @media #{variables.$mq-1350} {
      padding: 0;
      font-size: 1.1em;
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
        @media #{variables.$mq-1350} {
          height: 60px;
          width: 60px;
          min-width: 60px;
          min-height: 60px;
          & > div {
            height: 40px;
            width: 40px;
          }
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
          color: #5f5f5f;
          font-weight: 400;
        }
        & > p {
          margin: 0;
        }
        & > .author {
          color: #919191;
          font-size: 0.75em;
          font-weight: 600;
          margin-top: 5px;
          font-style: italic;
        }
        & > .description {
          margin: 0;
          color: #818181;
          font-weight: 400;
          margin-top: 0.5em;
          font-size: 0.9em;
        }
      }
    }
  }
</style>
