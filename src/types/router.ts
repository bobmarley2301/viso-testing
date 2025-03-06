import { Router } from "@tanstack/react-router";

export interface RouterContext {
  router: Router;
}

declare module "@tanstack/react-router" {
  interface Register {
    context: RouterContext;
  }
}
