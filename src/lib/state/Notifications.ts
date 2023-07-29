import { writable } from "svelte/store";
import type { INotification } from "./types";
import { TaskQueue } from "@figliolia/task-queue";
import { Queue } from "$lib/generics/Queue";

export const notifications = writable<Queue<INotification>>(new Queue());

export class NotificationState {
  public static Queue = new TaskQueue();

  public static lifecycle(ID: string, cb: () => void) {
    return this.Queue.deferTask(() => {
      cb();
      this.dequeue(ID);
    }, 5000);
  }

  public static enqueue(item: INotification) {
    notifications.update(v => {
      v.enqueue(item);
      return v;
    });
  }

  public static dequeue(ID: string) {
    this.Queue.deferTask(() => {
      notifications.update(v => {
        v.delete(ID);
        return v;
      });
    }, 800);
  }

  public static clearAll() {
    this.Queue.clearDeferredTasks();
    notifications.update(v => {
      v.clear();
      return v;
    });
  }
}
