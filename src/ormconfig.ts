import { DataSource } from 'typeorm';
import 'dotenv/config';
import * as process from 'process';
import { User } from './resources/user/entities/user.entity';
import { Task } from './resources/task/entities/task.entity';

const { env } = process;

const ormConfig = new DataSource({
  type: 'postgres',
  host: env.POSTGRES_HOST,
  port: parseInt(env.POSTGRES_PORT),
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  entities: [User, Task],
  synchronize: false,
  migrations: ['dist/migrations/*.js'],
});

export default ormConfig;
