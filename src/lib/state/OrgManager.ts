import type { Issue, Property } from "$lib/types/derived";
import { get } from "svelte/store";
import type { IssueStatus } from "$lib/types";
import { usersHash } from "./User";
import { organizationIndex, organizations } from "./Organization";

export class OrganizationState {
  static appendProperty(property: Property) {
    organizations.update(v => {
      const index = get(organizationIndex);
      v[index].properties.push(property);
      return v;
    });
  }

  static appendIssue(issue: Issue) {
    organizations.update(v => {
      const index = get(organizationIndex);
      v[index].issues.push(issue);
      return v;
    });
  }

  static updateIssueStatus(status: IssueStatus, issueIndex: number) {
    organizations.update(v => {
      const index = get(organizationIndex);
      const issue = v[index].issues[issueIndex];
      issue.status = status;
      return v;
    });
  }

  static updateIssueAssignment(userID: number | null, issueIndex: number) {
    organizations.update(v => {
      const index = get(organizationIndex);
      const issue = v[index].issues[issueIndex];
      issue.assigned_id = userID;
      issue.assigned = userID === null ? null : get(usersHash)[userID];
      return v;
    });
  }
}
