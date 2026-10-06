import { PostgresRepository } from "./PostgresRepository.js";

export class HealthRepository extends PostgresRepository {
  async check() {
    await this.query("SELECT 1");
  }
}
