import { IssueStatus } from "$lib/types";

export class Issues {
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

  public static gradients = {
    [IssueStatus.Open]: "url(#openGrad)",
    [IssueStatus.Complete]: "url(#completeGrad)",
    [IssueStatus.Inprogress]: "url(#inProgressGrad)",
  };

  public static getDisplay(status: string) {
    return this.statusDisplay[status as unknown as IssueStatus] || "";
  }

  public static getGradient(status: string) {
    return this.gradients[status as unknown as IssueStatus] || "";
  }
}
