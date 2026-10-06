import { timingSafeEqual } from "node:crypto";

export async function requireAdminKey(ctx, next) {
  const expected = process.env.ADMIN_API_KEY;
  const provided = ctx.get("x-admin-api-key");
  if (!expected || !provided)
    ctx.throw(401, "Valid x-admin-api-key header required");

  const expectedBuffer = Buffer.from(expected);
  const providedBuffer = Buffer.from(provided);
  const matches =
    expectedBuffer.length === providedBuffer.length &&
    timingSafeEqual(expectedBuffer, providedBuffer);
  if (!matches) ctx.throw(401, "Valid x-admin-api-key header required");

  await next();
}
