import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    mysql: {
      database: process.env.MYSQL_DATABASE,
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT, 10),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
    },
    postgresUrl: process.env.DATABASE_URL,
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
  };
});
