import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

config({
  path: join(__dirname, '..', '..', '.env'),
});

export const dataSource = new DataSource({
  type: 'mongodb',
  url: process.env['URL'],
  useNewUrlParser: true,
  migrations: ['**/*.migration.ts'],
});

dataSource.initialize().catch((err) => {
  console.error(
    `Error during Data Source initialization, in ${__dirname}`,
    err,
  );
});

/*
 * To create a migration file:
 * npx typeorm migration:create src/database/admin-credentials.migration
 *
 * To run migration files:
 * npx typeorm-ts-node-commonjs -d src/database/data-source.ts migration:run
 */
