export class DataPointAggregator<T extends { amount: number; created_at: string }> {
  data: T[];
  table: typeof DataPointAggregator.table;
  constructor(data: T[]) {
    this.data = data;
    this.table = this.initialize();
  }

  public get values() {
    return Object.values(this.table);
  }

  public get keys() {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;
  }

  private initialize() {
    const table = DataPointAggregator.table;
    for (const dataPoint of this.data) {
      const month = new Date(parseInt(dataPoint.created_at)).getMonth();
      // @ts-ignore
      table[month] += dataPoint.amount;
    }
    return table;
  }

  public static get table() {
    return {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
    };
  }
}
