import Router from "@koa/router";

export function createHealthRouter(healthController) {
  const router = new Router();
  router.get("/", (ctx) => healthController.check(ctx));
  return router;
}
