import Router from "@koa/router";
import { requireAdminKey } from "../middleware/requireAdminKey.js";

export function createExperimentRouter(experimentController) {
  const router = new Router();

  router.post("/", requireAdminKey, (ctx) => experimentController.create(ctx));
  router.post("/:experimentId/variant", (ctx) =>
    experimentController.getVariant(ctx),
  );

  return router;
}
