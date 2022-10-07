import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    db_connection: {
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      options: { encrypt: false },
    },
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
  };
});
