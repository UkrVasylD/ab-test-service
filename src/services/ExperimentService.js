import { randomInt } from "node:crypto";
import { createHttpError } from "../errors/createHttpError.js";

export class ExperimentService {
  constructor(experimentRepository, assignmentRepository, userRepository) {
    this.experimentRepository = experimentRepository;
    this.assignmentRepository = assignmentRepository;
    this.userRepository = userRepository;
  }

  createExperiment({ startsAt, endsAt, variantCount }) {
    if (endsAt <= startsAt)
      throw createHttpError(400, "endsAt must be later than startsAt");

    if (![2, 3].includes(variantCount))
      throw createHttpError(400, "variantCount must be 2 or 3");

    return this.experimentRepository.create({ startsAt, endsAt, variantCount });
  }

  async getVariant(experimentId, userId) {
    const experiment =
      await this.experimentRepository.findVariantConfiguration(experimentId);

    if (!experiment) throw createHttpError(404, "Experiment not found");

    if (!experiment.is_active) return 0;

    const isUserExisting = await this.userRepository.exists(userId);

    if (!isUserExisting) throw createHttpError(404, "User not found");

    const existingVariant = await this.assignmentRepository.findVariant(
      experimentId,
      userId,
    );

    if (existingVariant !== null) return existingVariant;

    const variant = randomInt(1, experiment.variant_count + 1);
    const assignedVariant = await this.assignmentRepository.createIfAbsent(
      experimentId,
      userId,
      variant,
    );
    if (assignedVariant !== null) return assignedVariant;

    return this.assignmentRepository.findVariant(experimentId, userId);
  }
}
