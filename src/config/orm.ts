import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
const options: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'data/dabase.db',
  logging: true,
  entities: [path.resolve(__dirname, '..', 'db', 'models', '*')],
  migrations: [path.resolve(__dirname, '..', 'db', 'migrations', '*')],
};
module.exports = options;
