import { pool } from "./db.js";
import { AssignmentRepository } from "./repositories/AssignmentRepository.js";
import { ExperimentRepository } from "./repositories/ExperimentRepository.js";
import { UserRepository } from "./repositories/UserRepository.js";
import { HealthRepository } from "./repositories/HealthRepository.js";
import { ExperimentService } from "./services/ExperimentService.js";
import { HealthService } from "./services/HealthService.js";
import { ExperimentController } from "./controllers/ExperimentController.js";
import { HealthController } from "./controllers/HealthController.js";

export function createContainer() {
  const experimentRepository = new ExperimentRepository(pool);
  const assignmentRepository = new AssignmentRepository(pool);
  const userRepository = new UserRepository(pool);
  const healthRepository = new HealthRepository(pool);

  const experimentService = new ExperimentService(
    experimentRepository,
    assignmentRepository,
    userRepository,
  );
  const healthService = new HealthService(healthRepository);

  return {
    experimentController: new ExperimentController(experimentService),
    healthController: new HealthController(healthService),
  };
}
