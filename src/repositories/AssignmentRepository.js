import { PostgresRepository } from "./PostgresRepository.js";

export class AssignmentRepository extends PostgresRepository {
  async findVariant(experimentId, userId) {
    const result = await this.query(
      "SELECT variant FROM assignments WHERE experiment_id = $1 AND user_id = $2",
      [experimentId, userId],
    );

    return result.rows[0]?.variant ?? null;
  }

  async createIfAbsent(experimentId, userId, variant) {
    const result = await this.query(
      `INSERT INTO assignments (experiment_id, user_id, variant)
       VALUES ($1, $2, $3)
       ON CONFLICT (experiment_id, user_id) DO NOTHING
       RETURNING variant`,
      [experimentId, userId, variant],
    );

    return result.rows[0]?.variant ?? null;
  }
}
