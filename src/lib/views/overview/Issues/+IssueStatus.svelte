<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { Writable } from "svelte/store";
  import type { ListItem } from "$lib/components/forms/types";
  import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
  import { setIssueStatusMutation } from "$lib/graphql/issues.gql";
  import DropDownList from "$lib/components/forms/+DropDownList.svelte";
  import { KeyboardAccessibility } from "$lib/generics/UX/KeyboardAccessibility";
  import { Issues } from "./Issues";
  import type { IssueStatus } from "$lib/schema/globalTypes";
  import type { IssueFragment } from "$lib/schema/IssueFragment";
  import type { SetStatus, SetStatusVariables } from "$lib/schema/SetStatus";

  export let id: number;
  export let index: number;
  export let status: IssueStatus;

  const issues = getContext<Writable<IssueFragment[]>>("issues");

  let open = false;

  export class UIController {
    public static statusList = Object.keys(Issues.statusDisplay).map(value => ({
      value,
      label: Issues.getDisplay(value).toUpperCase(),
    }));

    public static types = {
      fix: 1,
      complaint: 1,
      consultation: 1,
    };

    public static close = () => {
      open = false;
      // TODO - move into KeyboardAccessibility's internal logic
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
      const request = new GraphQLRequest<SetStatus, SetStatusVariables>({
        query: setIssueStatusMutation,
        variables: {
          id,
          status: value as IssueStatus,
        },
      });
      void request.send();
      issues.update(v => {
        v[index].status = value as IssueStatus;
        return v;
      });
      this.close();
    };

    public static currentValue(status: IssueStatus) {
      return { value: status, label: Issues.statusDisplay[status].toUpperCase() };
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
  <button class={`status ${Issues.statuses[status]}`} on:click={UIController.open}>
    {Issues.statusDisplay[status]}
  </button>
  <div class="dropdown" class:open>
    <div class="triangle" />
    <div class="shadow">
      <DropDownList
        accessibility={Accessibility}
        onSelect={UIController.select}
        items={UIController.statusList}
        value={UIController.currentValue(status)}
      />
    </div>
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
      top: calc(100% + 15px);
      right: 0px;
      border-radius: 5px;
      z-index: 5;
      font-size: 0.75em;
      min-width: 130px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px);
      transition: transform 0.25s, opacity 0.25s, visibility 0s 0.25s;
      &.open {
        visibility: visible;
        opacity: 1;
        transform: translateY(0px);
        transition: transform 0.25s, opacity 0.25s, visibility 0s 0s;
      }
      & > .triangle {
        position: absolute;
        bottom: 100%;
        right: 20px;
        width: 20px;
        height: 20px;
        overflow: hidden;
        &::after {
          content: "";
          position: absolute;
          width: 10px;
          height: 10px;
          background: #fff;
          transform: rotate(45deg);
          top: 15px;
          left: 2.5px;
          box-shadow: -1px -1px 3px 0px rgba(#000, 0.1);
        }
      }
      & > .shadow {
        overflow: hidden;
        box-shadow: 0px 2.5px 7.5px rgba(#000, 0.3);
        width: 100%;
      }
    }
  }
</style>
