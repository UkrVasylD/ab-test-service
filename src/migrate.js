import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { pool } from './db.js';

const migrationPath = new URL('../migrations/001_create_experiments.sql', import.meta.url);

try {
  const sql = await readFile(fileURLToPath(migrationPath), 'utf8');
  await pool.query(sql);
  console.log('Database migrations completed.');
} catch (error) {
  console.error('Database migration failed:', error);
  process.exitCode = 1;
} finally {
  await pool.end();
}