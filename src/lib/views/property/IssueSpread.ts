import type { PieGraph } from "$lib/graphing/PieGraph";
import type { PieData } from "$lib/graphing/types";
import { IssueStatus } from "$lib/types";

export class IssueSpread {
  public total = 0;
  public spread = {
    open: 0,
    complete: 0,
    inprogress: 0,
  };

  static categories = [IssueStatus.Complete, IssueStatus.Inprogress, IssueStatus.Open];

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
    if (this.isEmpty) {
      slices = [{ label: "complete", value: 1 }];
    }
    if (this.total === 1) {
      const status = this.find(1);
      if (status) {
        slices = [{ label: status, value: 1 }];
      }
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

  public find(total: number) {
    for (const status of IssueSpread.categories) {
      if (total === this.spread[status]) {
        return status;
      }
    }
    return null;
  }
}
