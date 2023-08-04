import type { PieGraph } from "$lib/graphing/PieGraph";
import type { IssueStatus } from "$lib/types";
import type { PieData } from "../types";

export class IssueSpread {
  public spread = {
    open: 0,
    complete: 0,
    inprogress: 0,
  };

  public increment(key: IssueStatus) {
    this.spread[key]++;
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
    return graph.Pie(slices).map(angle => {
      return {
        ...angle.data,
        // @ts-ignore
        path: graph.Arc(angle),
      };
    });
  }

  public get isEmpty() {
    for (const key in this.spread) {
      if (this.spread[key as IssueStatus] !== 0) {
        return false;
      }
    }
    return true;
  }
}
