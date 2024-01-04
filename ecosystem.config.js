module.exports = {
  apps: [
    {
      name: "api-rocketmovies",
      script: "./src/server.js",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
