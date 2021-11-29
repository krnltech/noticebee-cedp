module.exports = {
  apps: [
    {
      name: "noticebee-cedp-server",
      script: "./server/dist/index.js",
      env_production: {
        NODE_ENV: "production",
        PORT: 5000,
        REDIS_HOST: "localhost",
        REDIS_PORT: 6379,
      },
      env_development: {
        NODE_ENV: "development",
      },
    },
  ],
};
