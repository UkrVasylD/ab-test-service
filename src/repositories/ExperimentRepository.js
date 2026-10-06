import { PostgresRepository } from "./PostgresRepository.js";

export class ExperimentRepository extends PostgresRepository {
  async create({ startsAt, endsAt, variantCount }) {
    const result = await this.query(
      `INSERT INTO experiments (starts_at, ends_at, variant_count)
       VALUES ($1, $2, $3)
       RETURNING id, starts_at AS "startsAt", ends_at AS "endsAt", variant_count AS "variantCount"`,
      [startsAt, endsAt, variantCount],
    );

    return result.rows[0];
  }

  async findVariantConfiguration(experimentId) {
    const result = await this.query(
      `SELECT variant_count, starts_at <= now() AND now() < ends_at AS is_active
       FROM experiments WHERE id = $1`,
      [experimentId],
    );

    return result.rows[0] ?? null;
  }
}
