import Router from "@koa/router";
import { createContainer } from "../container.js";
import { createExperimentRouter } from "./experiments.js";
import { createHealthRouter } from "./health.js";

const container = createContainer();
const router = new Router();
const experimentRouter = createExperimentRouter(container.experimentController);
const healthRouter = createHealthRouter(container.healthController);

router.use(
  "/experiments",
  experimentRouter.routes(),
  experimentRouter.allowedMethods(),
);
router.use("/health", healthRouter.routes(), healthRouter.allowedMethods());

export default router;
