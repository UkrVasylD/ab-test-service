export class HealthService {
  constructor(healthRepository) {
    this.healthRepository = healthRepository;
  }

  check() {
    return this.healthRepository.check();
  }
}
