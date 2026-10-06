import {
  ISO_8601_TIMEZONE_SUFFIX_REGEX,
  UUID_REGEX,
} from "../constants/regex.js";
import { createHttpError } from "../errors/createHttpError.js";

export class ExperimentController {
  constructor(experimentService) {
    this.experimentService = experimentService;
  }

  async create(ctx) {
    const { startsAt, endsAt, variantCount } = ctx.request.body ?? {};
    const start = _parseDate(startsAt, "startsAt");
    const end = _parseDate(endsAt, "endsAt");

    ctx.status = 201;
    ctx.body = await this.experimentService.createExperiment({
      startsAt: start,
      endsAt: end,
      variantCount,
    });
  }

  async getVariant(ctx) {
    const { experimentId } = ctx.params;
    if (!UUID_REGEX.test(experimentId)) {
      ctx.throw(400, "experimentId must be a valid UUID");
    }

    const { userId } = ctx.request.body ?? {};
    if (
      typeof userId !== "string" ||
      userId.trim().length === 0 ||
      userId.length > 255
    ) {
      ctx.throw(
        400,
        "userId must be a non-empty string of at most 255 characters",
      );
    }

    const variant = await this.experimentService.getVariant(
      experimentId,
      userId,
    );

    ctx.body = { variant };
  }
}

function _parseDate(value, fieldName) {
  if (
    typeof value !== "string" ||
    !ISO_8601_TIMEZONE_SUFFIX_REGEX.test(value)
  ) {
    throw createHttpError(
      400,
      `${fieldName} must be an ISO 8601 timestamp with a timezone`,
    );
  }

  const timestamp = new Date(value);
  if (Number.isNaN(timestamp.getTime())) {
    throw createHttpError(400, `${fieldName} must be a valid date`);
  }
  return timestamp;
}
