export class Hashing {
  public static hashList<T extends Record<string, any>[], K extends keyof T[number]>(
    list: T,
    key: K,
  ) {
    const hash = {} as Record<ExtractValue<T[number], K>, T[number]>;
    for (const v of list) {
      // @ts-ignore
      hash[v[key]] = v;
    }
    return hash;
  }
}

export type ExtractValue<T extends Record<string, any>, K extends keyof T> = T[K];
