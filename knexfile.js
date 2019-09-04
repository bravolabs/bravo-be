require('dotenv').config();

module.exports = {
  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL || 'postgres://postgres:root@127.0.0.1:5432/bravo',
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'db_migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
  test: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL || 'postgres://postgres:root@127.0.0.1:5432/bravo_test',
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'db_migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'db_migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
};
