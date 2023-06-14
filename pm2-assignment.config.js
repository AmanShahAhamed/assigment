module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   *
   */
  apps: [
    {
      name: 'KFM_2.0 dev',
      script: 'npm run start',
      watch: ['src'],
      env_development: {
        PORT: 3002,
        VERSION: 'v1',
        NODE_ENV: 'development',
        DB_CONFIG: JSON.stringify({
          //--- **Local **------
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: '12345',
          database: 'assignment',
          entities: ['dist/**/*.entity.js'],
          autoLoadEntities: true,
          synchronize: true,
          keepConnectionAlive: true,
        }),
        APP_CLIENT_URL: 'http://localhost:3001',
      },
    },
  ],
};
