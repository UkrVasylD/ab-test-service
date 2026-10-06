export async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = {
      error: error.status ? error.message : "Internal server error",
    };
    if (ctx.status >= 500) ctx.app.emit("error", error, ctx);
  }
}
