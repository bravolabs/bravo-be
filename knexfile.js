module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://postgres@127.0.0.1:7777/bravo',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'db_migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
  test: {
    client: 'postgresql',
    connection: 'postgres://postgres:root@127.0.0.1:7777/bravo_test',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'db_migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'db_migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

}; 
