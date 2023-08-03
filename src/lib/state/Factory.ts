import type { Middleware } from "@figliolia/enhanced-stores";
import { EnhancerFactory, Logger, Profiler } from "@figliolia/enhanced-stores";

const middleware: Middleware[] = [];

if (import.meta.env.DEV) {
  middleware.push(new Profiler());
}

export const Factory = new EnhancerFactory(...middleware);
