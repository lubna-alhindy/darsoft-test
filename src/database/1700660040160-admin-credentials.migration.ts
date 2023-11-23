import { MongoQueryRunner } from 'typeorm/driver/mongodb/MongoQueryRunner';
import { MigrationInterface } from 'typeorm';

export class AdminCredentialsMigration1700660040160
  implements MigrationInterface
{
  public async up(queryRunner: MongoQueryRunner): Promise<void> {
    await queryRunner.insertOne('user', {
      email: 'system@darsoft.com',
      password: '$2b$10$1WO2iyApMi6bDGt2DnPC2.ygCaAfKqmAbCEmn6ow2KsT7tAYt5Hh2',
      profile: {
        fullName: 'Darsoft Admin',
      },
      isAdmin: true
    });
  }

  public async down(queryRunner: MongoQueryRunner): Promise<void> {}
}
