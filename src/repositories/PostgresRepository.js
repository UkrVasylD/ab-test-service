export class PostgresRepository {
  constructor(database) {
    if (!database || typeof database.query !== "function") {
      throw new TypeError(
        "PostgresRepository requires a query-capable database",
      );
    }

    this.database = database;
  }

  query(sql, parameters) {
    return this.database.query(sql, parameters);
  }
}
