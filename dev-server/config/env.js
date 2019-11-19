const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

/**
 * Determines the current environment and sets the appropriate variables
 * @param {Express App} app
 */
const setEnvironment = function(app) {
  if (
    !process.env.NODE_ENV ||
    process.env.NODE_ENV.toString().trim() !== "production"
  ) {
    setDevEnv(app);
  } else {
    setProdEnv(app);
  }
};

/**
 * Used to set development environment variables
 * @param {Express App} app
 */
function setDevEnv(app) {
  process.env.NODE_ENV = "development";
  app.use(express.json({ extended: false }));
  app.use(morgan("dev")); // Log HTTP Requests to the node console (for debugging purposes)
  app.use(cors()); // Enable Cross Origin Requests, since Vue.JS is on a different origin
  process.env.API_URL = "http://localhost:5555";
  process.env.VUE_APP_URL = "http://localhost:8080";
  process.env.DB_URL = "mongodb://localhost:27017/PYKEngine-db";
  process.env.TOKEN_SECRET = "MY_DEV_TOKEN";
  process.env.GIT_CLIENT_ID = "YOUR_GIT_API_ID";
  process.env.GIT_SECRET = "MY_GIT_API_SECRET";
}

/**
 * Used to set production environment variables
 * @param {Express App} app
 */
function setProdEnv(app) {
  process.env.NODE_ENV = "production";
  process.env.API_URL = "http://localhost:5555";
  process.env.VUE_APP_URL = "http://localhost:8080";
  process.env.DB_URL = "mongodb://localhost:27017/PYKEngine-db";
  process.env.TOKEN_SECRET = "MY_PROD_TOKEN";
  process.env.GIT_CLIENT_ID = "YOUR_GIT_API_ID";
  process.env.GIT_SECRET = "MY_GIT_API_SECRET";
  app.use(express.json({ extended: false }));
  app.use(express.static(__dirname + "/../../dist"));
}

module.exports = setEnvironment;
