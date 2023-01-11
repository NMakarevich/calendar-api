import { DataSource } from 'typeorm';
import 'dotenv/config';
import * as process from 'process';

const { env } = process;

const ormConfig = new DataSource({
  type: 'postgres',
  host: env.POSTGRES_HOST,
  port: parseInt(env.POSTGRES_PORT),
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  entities: [],
  synchronize: false,
  migrations: ['dist/migrations/*.js'],
});

export default ormConfig;