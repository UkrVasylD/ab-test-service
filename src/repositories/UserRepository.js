import { PostgresRepository } from "./PostgresRepository.js";

export class UserRepository extends PostgresRepository {
  async exists(userId) {
    // const result = await this.query(`SELECT 1 FROM users WHERE id = $1`, [
    //   userId,
    // ]);
    // return result.rows.length > 0;

    return true;
  }
}
