import Koa from "koa";
import bodyParser from "koa-bodyparser";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = new Koa();

app.use(errorHandler);
app.use(bodyParser({ jsonLimit: "16kb" }));
app.use(routes.routes());
app.use(routes.allowedMethods());

app.on("error", (error) => {
  console.error(error);
});

export default app;
