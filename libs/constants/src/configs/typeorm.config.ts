// TYPEORM_CONNECTION = "postgres"
// TYPEORM_HOST = "localhost"
// TYPEORM_USERNAME = "heat-sensor-db-user"
// TYPEORM_PASSWORD = "123456"
// TYPEORM_DATABASE = "heat-sensor-db"
// TYPEORM_PORT = 5432
// TYPEORM_SYNCHRONIZE = false
// TYPEORM_LOGGING = false

export const typeOrmConfig = {
  postgres: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'emrctnn',
    password: '123456',
    database: 'heat-sensor-db',
    synchronize: false,
    logging: false,
    extra: {}, // You can specify additional options here
  },
};

