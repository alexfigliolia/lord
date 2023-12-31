<script lang="ts">
  import DropDownList from "$lib/components/forms/+DropDownList.svelte";
  import { KeyboardAccessibility } from "$lib/generics/UX/KeyboardAccessibility";
  import Account from "$lib/icons/+Account.svelte";
  import { getContext, onMount } from "svelte";
  import { derived, get, type Readable, type Writable } from "svelte/store";
  import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
  import type { ListItem } from "$lib/components/forms/types";
  import { assignIssueMutation } from "$lib/graphql/issues.gql";
  import DownwardGradient from "$lib/components/gradients/+DownwardGradient.svelte";
  import type { UserFragment } from "$lib/schema/UserFragment";
  import type { IssueFragment, IssueFragment_assigned } from "$lib/schema/IssueFragment";
  import type { AssignIssue, AssignIssueVariables } from "$lib/schema/AssignIssue";
  import type { IssuesWithPropertyFragment_assigned } from "$lib/schema/IssuesWithPropertyFragment";

  export let id: number;
  export let index: number;
  export let assigned: IssueFragment_assigned | IssuesWithPropertyFragment_assigned | null;

  const userHash = getContext<Readable<Record<string, UserFragment>>>("users");
  const issues = getContext<Writable<IssueFragment[]>>("issues");
  const userList = derived(userHash, v => {
    return Object.values(v).map(u => ({ value: u.id, label: u.name }));
  });

  let open = false;

  class UIController {
    static toggle = () => {
      if (open) {
        return this.close();
      }
      open = true;
      Accessibility.onVisible();
    };

    static close = () => {
      open = false;
      Accessibility.onInvisible();
    };

    public static onSelect = ({ value }: ListItem) => {
      let nextID = typeof value === "string" ? null : value;
      if (nextID === assigned?.id) {
        nextID = null;
      }
      const request = new GraphQLRequest<AssignIssue, AssignIssueVariables>({
        query: assignIssueMutation,
        variables: {
          issue_id: id,
          user_id: nextID,
        },
      });
      void request.send();
      this.updateIssues(nextID);
    };

    private static updateIssues(userID: null | number) {
      issues.update(v => {
        if (userID === null) {
          v[index].assigned = null;
        } else {
          v[index].assigned = get(userHash)[userID];
        }
        return v;
      });
    }

    public static currentValue(
      assigned: IssueFragment_assigned | IssuesWithPropertyFragment_assigned | null,
    ) {
      return { value: assigned?.id || "", label: assigned?.name || "" };
    }
  }

  const Accessibility = new KeyboardAccessibility(UIController.close);

  onMount(() => {
    return () => {
      Accessibility.onInvisible();
    };
  });
</script>

<div class="actions">
  <div class="assignment" bind:this={Accessibility.container}>
    <button class="assignment" on:click={UIController.toggle}>
      <Account stroke="#fff" fill={assigned?.name ? "url(#acg)" : "#ddd"}>
        <DownwardGradient id="acg" />
      </Account>
    </button>
    <div class="dropdown" class:open>
      <div class="triangle" />
      <div class="shadow">
        {#if !assigned}
          <div class="unassigned">Unassigned</div>
        {/if}
        <DropDownList
          items={$userList}
          accessibility={Accessibility}
          onSelect={UIController.onSelect}
          value={UIController.currentValue(assigned)}
        />
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @use "$lib/variables";
  .actions {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.5%;
    & > .assignment {
      position: relative;
      & > button {
        padding: 0;
        margin: 0;
        background-color: transparent;
        border: none;
        height: 30px;
        width: 30px;
        box-sizing: border-box;
        border-radius: 50%;
        box-shadow: 0px 1px 3.5px rgba(#000, 0.2);
        &:focus-within {
          outline: 2px solid variables.$core;
        }
      }
      & > .dropdown {
        text-wrap: wrap;
        max-width: 250px;
        position: absolute;
        bottom: calc(100% + 12.5px);
        right: 0px;
        z-index: 5;
        font-size: 0.9em;
        min-width: 200px;
        visibility: hidden;
        opacity: 0;
        transform: translateY(-10px);
        transition: transform 0.25s, opacity 0.25s, visibility 0s 0.25s;
        &.open {
          visibility: visible;
          opacity: 1;
          transform: translateY(0px);
          transition: transform 0.25s, opacity 0.25s, visibility 0s 0s;
        }
        & > .triangle {
          position: absolute;
          top: 100%;
          right: 7.5px;
          width: 20px;
          height: 20px;
          overflow: hidden;
          transform: rotate(180deg);
          &::after {
            content: "";
            position: absolute;
            width: 10px;
            height: 10px;
            background: #fff;
            transform: rotate(45deg);
            top: 15px;
            left: 2.5px;
            box-shadow: -1px -1px 4px -1px rgba(#000, 0.25);
          }
        }
        & > .shadow {
          width: 100%;
          border-radius: 5px;
          overflow: hidden;
          box-shadow: 0px 2.5px 7.5px rgba(#000, 0.3);
          & > .unassigned {
            height: 40px;
            width: 100%;
            color: #d0d0d0;
            font-style: italic;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid #ebebeb;
          }
        }
      }
    }
  }
</style>
