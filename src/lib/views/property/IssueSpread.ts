import type { PieData } from "$lib/graphing/types";
import type { PieGraph } from "$lib/graphing/PieGraph";
import { IssueStatus } from "$lib/schema/globalTypes";

export class IssueSpread {
  public total = 0;
  public spread = {
    open: 0,
    complete: 0,
    inprogress: 0,
  };

  static categories = [IssueStatus.complete, IssueStatus.inprogress, IssueStatus.open];

  public increment(key: IssueStatus) {
    this.spread[key]++;
    this.total++;
  }

  public datum() {
    return Object.keys(this.spread).map(key => ({
      label: key,
      value: this.spread[key as IssueStatus],
    }));
  }

  public paths(graph: PieGraph, data: PieData[]) {
    let slices = data;
    const activeStatuses = this.activeStatuses();
    if (activeStatuses.size === 0) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
      slices = [{ value: 1, label: "complete" }];
    } else if (activeStatuses.size !== 3) {
      slices = data.filter(d => activeStatuses.has(d.label as IssueStatus));
    }
    return graph.Pie(slices).map(angle => {
      return {
        ...angle.data,
        // @ts-ignore
        path: graph.Arc(angle),
      };
    });
  }

  public get isEmpty() {
    return this.total === 0;
  }

  private activeStatuses() {
    const statuses = new Set<IssueStatus>();
    for (const status of IssueSpread.categories) {
      if (this.spread[status] !== 0) {
        statuses.add(status);
      }
    }
    return statuses;
  }
}
