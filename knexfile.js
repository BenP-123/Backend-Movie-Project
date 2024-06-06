const path = require("path");
require("dotenv").config();
const { parse } = require('pg-connection-string');
 
// Environment setup
const {
  NODE_ENV = "development",
  DEVELOPMENT_DATABASE_URL,
  PRODUCTION_DATABASE_URL,
} = process.env;
 
// Parse connection string and add SSL configuration for production
const connectionConfig = parse(NODE_ENV === "production" ? PRODUCTION_DATABASE_URL : DEVELOPMENT_DATABASE_URL);
if (NODE_ENV === "production") {
  connectionConfig.ssl = {
    rejectUnauthorized: false // Be cautious with this in production environments
  };
}
 
module.exports = {
  development: {
    client: "postgresql",
    connection: DEVELOPMENT_DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
    directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },
 
  production: {
    client: "postgresql",
    connection: connectionConfig,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "dr", "seeds"),
    },
  },
 
  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    useNullAsDefault: true,
  },
};
