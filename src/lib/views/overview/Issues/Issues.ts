import { IssueStatus } from "$lib/schema/globalTypes";

export class Issues {
  public static statuses = {
    [IssueStatus.open]: "red",
    [IssueStatus.complete]: "grey",
    [IssueStatus.inprogress]: "green",
  };

  public static statusDisplay = {
    [IssueStatus.open]: "Open",
    [IssueStatus.inprogress]: "In Progress",
    [IssueStatus.complete]: "Complete",
  };

  public static gradients = {
    [IssueStatus.open]: "url(#openGrad)",
    [IssueStatus.complete]: "url(#completeGrad)",
    [IssueStatus.inprogress]: "url(#inProgressGrad)",
  };

  public static getDisplay(status: string) {
    return this.statusDisplay[status as unknown as IssueStatus] || "";
  }

  public static getGradient(status: string) {
    return this.gradients[status as unknown as IssueStatus] || "";
  }
}
