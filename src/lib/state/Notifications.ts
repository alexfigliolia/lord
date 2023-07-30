import { derived, get, writable } from "svelte/store";
import type { INotification } from "./types";
import { TaskQueue } from "@figliolia/task-queue";
import { EfficientStack } from "$lib/generics/EfficientStack";

export const notifications = writable<EfficientStack<INotification>>(new EfficientStack());

export const renderStream = derived(notifications, v => v.reverse());

export class NotificationState {
  public static Queue = new TaskQueue();

  public static get maxIndex() {
    return get(notifications).size - 1;
  }

  public static lifecycle(ID: string, cb: () => void) {
    return this.Queue.deferTask(() => {
      cb();
      this.pop(ID);
    }, 5000);
  }

  public static push(item: INotification) {
    notifications.update(v => {
      v.push(item);
      return v;
    });
  }

  public static pop(ID: string) {
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
