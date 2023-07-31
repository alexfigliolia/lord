<script lang="ts">
  import { GraphQLRequest } from "$lib/GraphQLRequest";
  import DropDownList from "$lib/components/forms/+DropDownList.svelte";
  import type { ListItem } from "$lib/components/forms/types";
  import { KeyboardAccessibility } from "$lib/generics/KeyboardAccessibility";
  import { setIssueStatusMutation } from "$lib/graphql/issues.gql";
  import { OrganizationState } from "$lib/state/OrgManager";
  import { IssueStatus } from "$lib/types";
  import { onMount } from "svelte";

  export let id: number;
  export let index: number;
  export let status: IssueStatus;

  let open = false;

  export class UIController {
    public static statuses = {
      [IssueStatus.Open]: "red",
      [IssueStatus.Complete]: "grey",
      [IssueStatus.Inprogress]: "green",
    };

    public static statusDisplay = {
      [IssueStatus.Open]: "Open",
      [IssueStatus.Inprogress]: "In Progress",
      [IssueStatus.Complete]: "Complete",
    };

    public static statusList = Object.keys(this.statusDisplay).map(value => ({
      value,
      label: this.statusDisplay[value as IssueStatus].toUpperCase(),
    }));

    public static types = {
      fix: 1,
      complaint: 1,
      consultation: 1,
    };

    public static close = () => {
      open = false;
      Accessibility.onInvisible();
    };

    public static open = () => {
      open = true;
      Accessibility.onVisible();
    };

    public static select = ({ value }: ListItem) => {
      if (value === status) {
        return;
      }
      const request = new GraphQLRequest({
        query: setIssueStatusMutation,
        variables: {
          id,
          status: value,
        },
      });
      void request.send();
      OrganizationState.updateIssueStatus(value as IssueStatus, index);
      this.close();
    };

    public static currentValue(status: IssueStatus) {
      return { value: status, label: this.statusDisplay[status].toUpperCase() };
    }
  }

  const Accessibility = new KeyboardAccessibility(UIController.close);

  onMount(() => {
    return () => {
      Accessibility.onInvisible();
    };
  });
</script>

<div class="status-display" bind:this={Accessibility.container}>
  <button class={`status ${UIController.statuses[status]}`} on:click={UIController.open}>
    {UIController.statusDisplay[status]}
  </button>
  <div class="dropdown" class:open>
    <DropDownList
      value={UIController.currentValue(status)}
      items={UIController.statusList}
      accessibility={Accessibility}
      onSelect={UIController.select}
    />
  </div>
</div>

<style lang="scss">
  @use "$lib/variables";
  .status-display {
    align-self: center;
    position: relative;
    & > .status {
      outline: none;
      border: none;
      padding: 10px 20px;
      border-radius: 25px;
      @include variables.center;
      text-transform: uppercase;
      font-size: 0.75em;
      font-weight: 700;
      text-wrap: nowrap;
      border: none;
      &.green {
        background: linear-gradient(to bottom, rgb(143, 227, 143), rgb(105, 225, 105));
        color: rgb(2, 148, 51);
        box-shadow: 0px 1.5px 4px rgb(105, 225, 105);
        &:focus-within {
          outline: 2px solid rgb(105, 225, 105);
        }
      }
      &.red {
        background: linear-gradient(to bottom, rgb(255, 172, 172), rgb(254, 127, 127));
        color: rgb(177, 34, 34);
        box-shadow: 0px 1.5px 4px rgb(254, 127, 127);
        &:focus-within {
          outline: 2px solid rgb(254, 127, 127);
        }
      }
      &.grey {
        background: linear-gradient(to bottom, rgb(220, 220, 220), rgb(205, 203, 203));
        color: rgb(153, 152, 152);
        box-shadow: 0px 1.5px 4px rgb(205, 203, 203);
        &:focus-within {
          outline: 2px solid rgb(205, 203, 203);
        }
      }
    }
    & > .dropdown {
      text-wrap: wrap;
      max-width: 200px;
      position: absolute;
      top: calc(100% + 10px);
      right: 0px;
      border-radius: 5px;
      z-index: 5;
      font-size: 0.75em;
      min-width: 130px;
      overflow: hidden;
      box-shadow: 0px 2.5px 7.5px rgba(#000, 0.3);
      visibility: hidden;
      opacity: 0;
      transform: translateY(10px);
      transition: transform 0.25s, opacity 0.25s, visibility 0s 0.25s;
      &.open {
        visibility: visible;
        opacity: 1;
        transform: translateY(0px);
        transition: transform 0.25s, opacity 0.25s, visibility 0s 0s;
      }
    }
  }
</style>
